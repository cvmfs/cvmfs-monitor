FROM centos:8

EXPOSE 8080

USER root

RUN yum install -y epel-release

RUN yum install -y git npm

ADD https://cern.ch cache_bust

WORKDIR /root
RUN git clone https://github.com/janpriessnitz/js-monitor.git

WORKDIR /root/js-monitor/frontend
RUN npm install
RUN npm run build

RUN useradd cvmfs-monitor

RUN chmod 755 /root
RUN chown -R cvmfs-monitor:cvmfs-monitor /root/js-monitor/

USER cvmfs-monitor

CMD npm run start