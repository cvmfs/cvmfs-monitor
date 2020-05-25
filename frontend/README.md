# CVMFS Monitor

[CVMFS](https://cvmfs.readthedocs.io/en/stable/) is scalable, reliable and low-maintenance software distribution service.
It was developed to assist High Energy Physics (Hep) to deploy software on the worldwide distribution computing infrastructure.
CernVM-FS is implemented as a globally distributed file system. [more](https://cvmfs.readthedocs.io/en/stable/cpt-overview.html)
<br/>
Like any large distributed system, CernVM-FS needs some health monitoring.An important information is whether all the stratum 1
replica servers are up-to-date and serve the latest copy of the scientific software stacks.

## How to run the project in development mode:
* You have to „Clone or download” this project.
* install all project dependencies with `npm install`
* create a .env file in the root directory with variable from example.env
* start the development server with `npm start`

## How to run the project in production mode: 
* `npm run build`
* If you don't have `serve` install `npm install -g serve`
* Port can be adjusted using the -l or --listen flags `serve -s build -l 3000`

## License
This project is licensed under the BSD-3-Clause License.