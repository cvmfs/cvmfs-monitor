import { getJSONfromRepository } from './cvmfs.js';
var libcvmfs = require('../build/Release/cvmfs_node.node');

var repolist = require('./loadrepos');

export async function repos(req, res) {

    res.json({
        repositories: repolist(),
        status: "ok",
    });
}

export async function details(req, res) {
    let repoName = req.params.repo;
    let baseRepoUrl = req.query.repoUrl;
    if (baseRepoUrl == undefined) {
        console.log("resolving repository url from default config");
        baseRepoUrl = libcvmfs.getOption(repoName, "CVMFS_SERVER_URL")
                              .split(";")[0]
                              .replace("@fqrn@", "");
    }

    try {
        console.log(`Fetching repository ${repoName} from ${baseRepoUrl}`);
        let reposonseJSON = await getJSONfromRepository(baseRepoUrl, repoName);
        reposonseJSON.status = "ok";
        res.json(reposonseJSON);
    } catch (error) {
        res.json({
            status: "error",
            error: error.message
        });
        console.log(error);
    }
}

export async function stat(req, res) {
    let repoName = req.params.repo;
    let path = "/" + ((typeof req.params.path !== "undefined") ? req.params.path : "");
    try {
        let result = libcvmfs.stat(repoName, path);
        result.status = "ok";
        res.json(result);
    } catch(err) {
        let result = {
            status: "error",
            error: err.message
        };
        res.json(result);
    }
}

export async function fetch(req, res) {
    let repoName = req.params.repo;
    let path = "/" + ((typeof req.params.path !== "undefined") ? req.params.path : "");
    try {
        var result = libcvmfs.stat(repoName, path);
        var fd = libcvmfs.open(repoName, path);
    } catch(err) {
        let answer = {
            status: "error",
            error: err.message
        }
        res.json(answer)
        return;
    }
    res.attachment();

    let offset = 0;
    try {
        while(true) {
            let buf = libcvmfs.pread(repoName, fd, 1024*1024, offset); // 1 MB
            if (buf.bytesRead == 0) break;
            res.write(Buffer.from(buf.buffer, 0, buf.bytesRead));
            offset += buf.bytesRead;
        }
    } catch(err) {
        let answer = {
            status: "error",
            error: err.message
        }
        res.json(answer)
    } finally {
        libcvmfs.close(repoName, fd);
        res.end();
    }
}