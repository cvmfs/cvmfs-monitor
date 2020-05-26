# CVMFS Monitor

A web application for monitoring the status of CVMFS repositories.

It is divided into two components:

Frontend is a static application serving HTML and Javascript needed to display the website.
Users can view repository information and status, but also browse through the files inside the repository. 

Backend is a REST API application providing actual information about the repositories, mainly repository metainfo and health checks for Stratum0 and Stratum1s. It also provides stat information and directory
listings for files inside the repository.

Users access the website through frontend, client-side requests are then made from the user's browser to the backend to obtain all necessary information.

## Building and running

Both frontend and backend components have their own `package.json` files and can be built and run through `npm` command. Top-level `package.json` file can be used for simplified operation interface:

1. `export CVMFS_MONITOR_MODE=backend|frontend`
2. `npm install`
3. `npm build`
4. `npm run`

However, the backend component relies on having libcvmfs, its dependencies and compiler installed,
which is not always possible. Recommended method of deployment is through a prebuilt docker
image available in Gitlab registry of this repository.

## Deployment via docker image

Both components can be run from a docker container. Simply pull the docker image from Gitlab registry in this repository and run. The applications listen on port `8080`. To expose the application, run the `docker run` command with `-p <outside port>:8080` option.

## Deployment example (HOWTO): Openshift service hosted on CERN Web services

Both backend and frontend can be set up by doing following steps: 

1. Create a new website hosted on Openshift on CERN Web services website.
2. In Openshift web console of the project, click "Deploy image" and provide pull spec for the CVMFS monitor image (e. g. gitlab-registry.cern.ch/cernvm/cvmfs-monitor/cvmfs-monitor-backend).
3. In Openshift web console, create a route to the created deployment/service.
4. On CERN Web services website, change the site visibility from "Intranet" to "Internet" (in "Site Access & Permissions").

## Building CVMFS monitor docker image

If using the prebuilt image is not prefered for any reason, one can also build CVMFS monitor docker image
on its own. `backend` and `frontend` directories contain reference Dockerfiles which are used for building
our prebuilt CVMFS monitor images. Users can modify these Dockerfiles or point them to custom CVMFS monitor
repository forks to achieve custom functionality.

Our prebuilt images are built using these referenced Dockerfiles. Building happens in Gitlab CI using `kaniko`. For more information, see `.gitlab-ci.yml` in top level directory of this repository. 

## License
This project is licensed under the BSD-3-Clause License.

