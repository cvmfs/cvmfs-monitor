import { Repository } from './repo.js';
import { isURLvalid, lookupIPfromURL } from './util.js';
import geoip from 'geoip-lite';

async function getStratum1JSON(stratumOne, repositoryName) {
    const stratumOneBaseUrl = stratumOne.replace(`/${repositoryName}`, '').trim();

    // Check if stratumOneBaseUrl is a valid URL
    if(! isURLvalid(stratumOneBaseUrl)) {
        throw new Error(`Stratum 1 URL is invalid: '${stratumOneBaseUrl}'`);
    }

    const stratumOneRepository = new Repository(stratumOneBaseUrl, repositoryName)

    await stratumOneRepository.connect();

    const revision = stratumOneRepository.getRevision();
    const publishedTimestamp = stratumOneRepository.getPublishedTimestamp();

    const metainfoForStratumOne = stratumOneRepository.getMetainfoForStratumOne();
    const metainfoForStratumOneJson = JSON.parse(metainfoForStratumOne)

    const ip = await lookupIPfromURL(stratumOneRepository._baseURL);
    const geo = await geoip.lookup(ip);

    return {
        url: stratumOneRepository._baseURL,
        revision: revision,
        publishedTimestamp: publishedTimestamp,
        name: metainfoForStratumOneJson.organisation,
        location: geo,
        last_gc: stratumOneRepository.getLastGc(),
        last_snapshot: stratumOneRepository.getLastSnapshot(),
        passthrough: stratumOneRepository.getPassthrough(),
    };
}

export async function getJSONfromRepository(repositoryWebsite, repositoryName) {

    let repository = new Repository(repositoryWebsite, repositoryName);
    await repository.connect();

    const manifest = repository.getManifest();
    const metainfo = repository.getMetainfo();
    const whitelist = repository.getWhitelist();
    const metainfoJson = JSON.parse(metainfo)
    const repositoryRevision = repository.getRevision();
    const repositoryPublishedTimestamp = repository.getPublishedTimestamp();

    let resultJson = {};
    let recommendedStratumOne = '';
    let revision = '';
    let stratumOne = [];
    let repositoryState = '';
    let healthStratumOne = '';
    let i = 1;
    let publishedTimestamp = '';
    let stratumOneAllRevision = [];
    let hashAlgorithm = '';

    resultJson.fqrn = repositoryName;
    resultJson.administrator = metainfoJson.administrator;
    resultJson.email = metainfoJson.email;
    resultJson.organisation = metainfoJson.organisation;
    resultJson.description = metainfoJson.description;
    resultJson.url = metainfoJson.url;
    resultJson.custom = metainfoJson.custom;
    resultJson.download = {
        catalog: repository.catalogURL,
        certificate: repository.certificateString,
        manifest: repository.manifestURL,
        whitelist: repository.whitelistURL,
        metainfo: JSON.stringify(metainfoJson),
    };
    resultJson.whitelistExpiryDate = whitelist.expiryDate;
    // resultJson.rootHash = manifest.rootHash;
    // resultJson.hashAlgorithm = hashAlgorithm;
    resultJson.rootHash = manifest.catalogHash.downloadHandle;
    resultJson.hashAlgorithm = manifest.catalogHash.algorithm;
    resultJson.expiryDate = repository.expiryDate;
    resultJson.recommendedStratum0 = {
        url: metainfoJson['recommended-stratum0'],
        revision: repositoryRevision,
        publishedTimestamp: repositoryPublishedTimestamp
    };

    let stratum1Promises = [];

    // Kick off Stratum1 info retrieval in parallel
    for (const key of metainfoJson['recommended-stratum1s']) {
        stratum1Promises.push(getStratum1JSON(key, repositoryName));
    }

    // Gather Stratum1 info
    for (const stratum1Promise of stratum1Promises) {
        let stratum1JSON = await stratum1Promise;

        let stratum1Health = '';
        // Assign state of repository
        if ( repositoryRevision === stratum1JSON.revision &
            repositoryPublishedTimestamp === stratum1JSON.publishedTimestamp
        ) {
            stratum1Health = 'green';
        } else if (( repositoryRevision === stratum1JSON.revision + 1 | repositoryRevision === stratum1JSON.revision + 2 ) &
                    repositoryPublishedTimestamp - 30 * 60 < stratum1JSON.publishedTimestamp
                ) {
            stratum1Health = 'yellow';
        } else if ( repositoryRevision !== revision &
                    repositoryPublishedTimestamp - 30 * 60 > stratum1JSON.publishedTimestamp
                ) {
            stratum1Health = 'red';
        };

        stratum1JSON['health'] = stratum1Health;

        stratumOne.push(stratum1JSON);

        stratumOneAllRevision.push(stratum1JSON.revision);

    };

    // Chceck revisoin for all stratumOne repositoris
    if (stratumOne.find(x => x.health.includes('red'))) {
        healthStratumOne = 'red';
    } else if (stratumOne.find(x => x.health.includes('yellow') && !x.health.includes('red'))) {
        healthStratumOne = 'yellow';
    } else if (stratumOne.find(x => x.health.includes('green') && !x.health.includes('yellow') && !x.health.includes('red'))) {
        healthStratumOne = 'green';
    }
    // Check algorithm
    // if (manifest.rootHash.includes("rmd160")) {
    //     hashAlgorithm = "rmd160";
    // } else if (manifest.rootHash.includes("shake128")) {
    //     hashAlgorithm = "shake128";
    // } else {
    //     hashAlgorithm = "SHA1";
    // }

    resultJson.recommendedStratum1s = stratumOne;
    resultJson.health = healthStratumOne;
    resultJson.oldestRevisionStratumOne = Math.min(...stratumOneAllRevision);

    return resultJson;
}
