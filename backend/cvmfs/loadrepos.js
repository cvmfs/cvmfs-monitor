const execSync = require('child_process').execSync;
const fs = require('fs');
const kTTL = 1000*60*15;  // 15 minutes

var lastUpdated = 0;
function pullGitRepo() {
    // TODO: error handling 
    const output = execSync('git submodule update --remote', { encoding: 'utf-8'});
    lastUpdated = Date.now();
}

var repolist = [];
function loadRepos() {
    if (Date.now() - lastUpdated > kTTL) {
        pullGitRepo();
        
        var repo_files = fs.readdirSync('monitor-repos/repos');
        repolist = [];
        repo_files.forEach((filename) => {
            repolist.push(require('../monitor-repos/repos/' + filename));
        });
    }
    return repolist;
}

module.exports = loadRepos;
