'use strict'

// import { crypto } from 'jsrsasign';
import { repoURL, dataURL, digestHex, stringToHex} from './util.js';
import { Retriever } from './retriever.js';
import { KeyManager } from './masterkeys.js';
// import { X509 } from 'jsrsasign';
import jsrsasign from 'jsrsasign';

// Bit flags
export const ENTRY_TYPE = Object.freeze({
  DIR: 1,
  NEST_TRANS: 2,
  REG: 4,
  SYMB_LINK: 8,
  NEST_ROOT: 32,
  CHUNKD: 64,
  BIND_MOUNT: 1 << 14,
  HIDDEN: 1 << 15
});

// Bit flags
export const CHUNK_HASH_ALG = Object.freeze({
  RIPEMD_160: 1 << 8,
  SHAKE_128: 1 << 9
});

// Bit flags
export const COMPRESSION_ALG = Object.freeze({
  NO_COMPRESSION: 1 << 11
});

export class Repository {
  constructor(baseURL, repoName) {
    this.retriever = new Retriever();
    this.keyManager = new KeyManager();

    this._baseURL = baseURL;
    this._repoName = repoName;
    this._repoURL = repoURL(baseURL, repoName);
    this._dataURL = dataURL(baseURL, repoName);

    this.catalogURL = '';
    this.certificateURL = '';
    this.manifestURL = this._repoURL + '/.cvmfspublished';
    this.metainfoURL = '';
    this.whitelistURL = this._repoURL + '/.cvmfswhitelist';
    this.expiryDate = true;
  }

  async connect() {
    // Explained in detail: https://cvmfs.readthedocs.io/en/stable/cpt-details.html
    this._manifest = await this.retriever.fetchManifest(this.manifestURL, this._repoName);
    // console.log("this._manifest", this._manifest);
    if(! this._manifest.metainfoHash) {
      throw new Error("metainfoHash is undefined");
    }

    this.catalogURL = this.retriever.generateChunkURL(this._dataURL, this._manifest.catalogHash.downloadHandle, 'C')
    this.certificateURL = this.retriever.generateChunkURL(this._dataURL, this._manifest.certHash.downloadHandle, 'X')
    this.metainfoURL = this.retriever.generateChunkURL(this._dataURL, this._manifest.metainfoHash.downloadHandle, 'M')

    const metainfoPromise = this.retriever.fetchMetainfo(this.metainfoURL, this._manifest.metainfoHash, this._manifest.certHash);
    const whitelistPromise = this.retriever.fetchWhitelist(this.whitelistURL, this._repoName);
    const certificatePromise = this.retriever.fetchCertificate(this.certificateURL, this._manifest.certHash);
    const stratum1MetainfoPromise = this.retriever.downloadMetainfoStratumOne(this._baseURL);
    const cvmfsStatusPromise = this.retriever.downloadCvmfsStatus(this._baseURL, this._repoName);
    const stratum1Repolist = this.retriever.downloadRepolistStratumOne(this._baseURL);


    this._metainfo =  await metainfoPromise;
    this._whitelist = await whitelistPromise;
    this.certificateString = await certificatePromise;
    this._metainfoForStratumOne = await stratum1MetainfoPromise;
    this._cvmfsStatusJson = JSON.parse(await cvmfsStatusPromise);
    this._repolistForStratumOneJson = JSON.parse(await stratum1Repolist);

    this._cert = new jsrsasign.X509();
    this._cert.readCertPEM(this.certificateString);


    /* verify whitelist signature */
    let isWhitelistVerified = false;

    for (const key of this.keyManager.getMasterKeys()) {
      const downloadHandle = this._whitelist.metadataHash.downloadHandle;
      const downloadHandleHex = stringToHex(downloadHandle);

      isWhitelistVerified = this.keyManager.verifyRawWithMessageHex(
        key,
        downloadHandleHex, // We expect the signature to RSA decrypt to this hash value
        this._whitelist.signatureHex
      );

      if (isWhitelistVerified) {
        break;
      }
    }

    if (!isWhitelistVerified) {
      throw new Error('Unable to verify whitelist: No public key matched');
    }

    const now = new Date();
    if (now >= this._whitelist.expiryDate) {
      // throw new Error('The whitelist is expired.');
      this.expiryDate = false;
    }

    /* verify certificate fingerprint */
    let isCertificateFingerprintVerified = false;

    for (const fingerprint of this._whitelist.certificateFingerprint) {

      let fingerprintDownloadHandle = fingerprint.downloadHandle;
      if(fingerprint.downloadHandle.includes("#")) {
        fingerprintDownloadHandle = fingerprint.downloadHandle.substring(0, fingerprint.downloadHandle.indexOf('#')).trim();
      }

      const computedFingerprint = digestHex(this._cert.hex, fingerprint.algorithm);

      if (fingerprintDownloadHandle === computedFingerprint) {
        isCertificateFingerprintVerified = true
        break;
      }
    }

    if (!isCertificateFingerprintVerified) {
      throw new Error("Unable to verify certificate. Fingerprints don't match.");
    }

    /* verify manifest signature */
    const signature = new jsrsasign.crypto.Signature({alg: 'SHA1withRSA'});
    signature.init(this._cert.getPublicKey());
    signature.updateString(this._manifest.metadataHash.downloadHandle);

    if(!signature.verify(this._manifest.signatureHex)) {
      throw new Error('Unable to verify manifest');
    }

    if(! this._manifest.metainfoHash) {
      throw new Error("metainfoHash is undefined");
    }

    this._revision =  this._manifest.revision;
    this._publishedTimestamp =  this._manifest.publishedTimestamp;
    this._last_gc = Date.parse(this._cvmfsStatusJson.last_gc) / 1000;
    this._last_snapshot = Date.parse(this._cvmfsStatusJson.last_snapshot) / 1000;

    try {
      this._repolistForStratumOneJson.replicas.foreach( function(repo) {
        if (repo.name == this._repoName) {
          if (repo["pass-through"] == "true") {
            this._passthrough = true;
          } else {
            this._passthrough = false;
          }
        }
      });
    }
    catch(err) {
      this._passthrough = false;
    }
  }

  getManifest() {
    return this._manifest;
  }

  getWhitelist() {
    return this._whitelist;
  }

  getCertificate() {
    return this._cert;
  }

  getMetainfo() {
    return this._metainfo;
  }

  getRevision() {
    return this._revision;
  }

  getPublishedTimestamp() {
    return this._publishedTimestamp;
  }

  getMetainfoForStratumOne() {
    return this._metainfoForStratumOne;
  }

  getLastSnapshot() {
    return this._last_snapshot;
  }

  getLastGc() {
    return this._last_gc;
  }

  getPassthrough() {
    return this._passthrough;
  }
}
