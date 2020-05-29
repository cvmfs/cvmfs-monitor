FROM centos:8

EXPOSE 8080

USER root

RUN yum install -y epel-release

RUN yum install -y git npm

ADD https://cern.ch cache_bust

WORKDIR /root
RUN git clone https://gitlab.cern.ch/cernvm/cvmfs-monitor.git

WORKDIR /root/cvmfs-monitor/frontend
RUN npm install
RUN npm run build

RUN useradd monitor

RUN chmod 755 /root
RUN chown -R monitor:monitor /root/cvmfs-monitor/

USER monitor

CMD npm run start
