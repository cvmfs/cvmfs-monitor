import { getJSONfromRepository } from './cvmfs.js';
var libcvmfs = require('../build_addon/Release/cvmfs_node.node');

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
        const reposonseJSON = await getJSONfromRepository(baseRepoUrl, repoName);
        // console.log("reposonseJSON",reposonseJSON)
        res.json(reposonseJSON);
    } catch (error) {
        console.log(error)
        res.status(404).send(error.message);
    }
}

export async function stat(req, res) {
    let repoName = req.params.repo;
    let path = "/" + ((typeof req.params.path !== "undefined") ? req.params.path : "");
    let result = libcvmfs.stat(repoName, path);
    result.status = "ok";
    res.json(result);
}

export async function fetch(req, res) {
    let repoName = req.params.repo;
    let path = "/" + ((typeof req.params.path !== "undefined") ? req.params.path : "");
    let result = libcvmfs.stat(repoName, path);
    let fd = libcvmfs.open(repoName, path);
    console.log("fd: " + fd);

    res.attachment();

    let offset = 0;
    while(true) {
        let buf = libcvmfs.pread(repoName, fd, 1024*1024, offset); // 1 MB
        if (buf.bytesRead == 0) break;
        res.write(Buffer.from(buf.buffer, 0, buf.bytesRead));
        offset += buf.bytesRead;
        console.log(offset);
    }

    libcvmfs.close(repoName, fd);
    res.end();
}