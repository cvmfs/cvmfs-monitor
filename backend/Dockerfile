FROM centos:8

EXPOSE 8080

USER root

# TODO: uncomment as soon as libcvmfs built with -fPIC is released
#RUN yum install -y https://ecsft.cern.ch/dist/cvmfs/cvmfs-release/cvmfs-release-latest.noarch.rpm
#RUN yum install -y cvmfs-devel

RUN yum install -y openssl libuuid-devel libcurl-devel

RUN curl http://ecsft.cern.ch/dist/cvmfs/nightlies/cvmfs-git-2290/cvmfs-devel-2.8.0-0.2290.cb9d83072de7a5e9git.el8.x86_64.rpm > /root/cvmfs-devel.rpm
RUN rpm -i /root/cvmfs-devel.rpm
RUN curl http://ecsft.cern.ch/dist/cvmfs/cvmfs-config/cvmfs-config-default-latest.noarch.rpm > /root/cvmfs-config.rpm
RUN rpm -i /root/cvmfs-config.rpm

RUN echo "CVMFS_HTTP_PROXY=DIRECT" > /etc/cvmfs/default.local

# TODO: install computecanada configuration from proper upstream source
RUN mkdir /etc/cvmfs/keys/computecanada.ca
RUN echo "CVMFS_KEYS_DIR=/etc/cvmfs/keys/computecanada.ca" > /etc/cvmfs/domain.d/computecanada.ca.conf
RUN echo "CVMFS_SERVER_URL='http://cvmfs-s1-arbutus.computecanada.ca:8000/cvmfs/@fqrn@;http://cvmfs-s1-east.computecanada.ca:8000/cvmfs/@fqrn@;http://cvmfs-s1-beluga.computecanada.ca:8000/cvmfs/@fqrn@'" >> /etc/cvmfs/domain.d/computecanada.ca.conf
RUN curl https://ecsft.cern.ch/dist/cvmfs/builddeps/computecanada.ca.pub > /etc/cvmfs/keys/computecanada.ca/computecanada.ca.pub

# TODO: install through proper configuration repo
# https://github.com/airnandez/sw-lsst-eu/releases/download/v0.7/cvmfs-config-lsst-0.7-1.noarch.rpm
RUN mkdir /etc/cvmfs/keys/lsst.eu
RUN echo "CVMFS_KEYS_DIR=/etc/cvmfs/keys/lsst.eu" > /etc/cvmfs/domain.d/lsst.eu.conf
RUN echo "CVMFS_SERVER_URL='http://cclssts1.in2p3.fr/cvmfs/@fqrn@;http://cvmfs-stratum-one.cern.ch/cvmfs/@fqrn@;http://cvmfs-s1goc.opensciencegrid.org/cvmfs/@fqrn@'" >> /etc/cvmfs/domain.d/lsst.eu.conf
RUN curl https://ecsft.cern.ch/dist/cvmfs/builddeps/lsst.eu.pub > /etc/cvmfs/keys/lsst.eu/lsst.eu.pub


RUN mkdir -p /var/lib/cvmfs/libcvmfs
RUN chmod -R 777 /var/lib/cvmfs

RUN yum install -y epel-release

RUN yum install -y gcc-c++ python3 make git npm

ADD https://cern.ch cache_bust

WORKDIR /root
RUN git clone https://gitlab.cern.ch/cernvm/cvmfs-monitor.git


RUN useradd cvmfs-monitor
RUN chmod -R 777 /root
RUN chown -R cvmfs-monitor:cvmfs-monitor /root/cvmfs-monitor/

USER cvmfs-monitor
WORKDIR /root/cvmfs-monitor/backend
RUN git submodule init
RUN npm ci
RUN npm run build
RUN npm run build-addon

RUN echo "PORT=8080" > .env
RUN echo "API_PATH=/api/v0" >> .env

CMD npm run start
