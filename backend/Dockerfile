FROM centos:8

EXPOSE 8080

USER root

# TODO: uncomment as soon as libcvmfs built with -fPIC is released
#RUN yum install -y https://ecsft.cern.ch/dist/cvmfs/cvmfs-release/cvmfs-release-latest.noarch.rpm
#RUN yum install -y cvmfs-devel

RUN yum install -y openssl libuuid-devel libcurl-devel

RUN curl http://ecsft.cern.ch/dist/cvmfs/nightlies/cvmfs-git-2240/cvmfs-devel-2.8.0-0.2240.fc758aa629c5da16git.el8.x86_64.rpm > /root/cvmfs-devel.rpm
RUN rpm -i /root/cvmfs-devel.rpm
RUN curl http://ecsft.cern.ch/dist/cvmfs/cvmfs-config/cvmfs-config-default-latest.noarch.rpm > /root/cvmfs-config.rpm
RUN rpm -i /root/cvmfs-config.rpm

RUN echo "CVMFS_HTTP_PROXY=DIRECT" > /etc/cvmfs/default.local

RUN mkdir -p /var/lib/cvmfs/libcvmfs
RUN chmod -R 777 /var/lib/cvmfs

RUN yum install -y epel-release

RUN yum install -y gcc-c++ python3 make git npm

ADD https://cern.ch cache_bust

WORKDIR /root
RUN git clone https://github.com/janpriessnitz/js-monitor.git

WORKDIR /root/js-monitor/backend
RUN npm install
RUN npm run build
RUN npm run build-addon

RUN useradd cvmfs-monitor

RUN chmod 755 /root
RUN chown -R cvmfs-monitor:cvmfs-monitor /root/js-monitor/

USER cvmfs-monitor

CMD npm run start
