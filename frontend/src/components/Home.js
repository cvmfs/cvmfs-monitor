import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { black, above } from "../utilities";
import { Input } from "../elements";
import { connect } from "react-redux";
import { relativeTimeRounding } from "moment";

const Main = styled.div`
  max-width: 1200px;
  min-height: calc(100vh - 94px);
  margin: 0px 10px;
  ${above.desktop`
    margin: 0 auto;
  `}
  .repository-name {
    color: ${black}
    font-size: 0.9em;
    line-height: 1em;
    text-decoration: none;
    ${above.smallPhone`
      font-size: 1em;
      line-height: 1.25em;
    `}
    ${above.phone`
      font-size: 1.25em;
    `}
  }
  .list {
    margin: 20px 0px;
  }
`;

const Title = styled.div`
  padding: 20px 0px;
  color: ${black};
  font-size: 1.75em;
  font-weight: 500;
  ${above.smallPhone`
    font-size: 2em;
  `}
  ${above.phone`
    font-size: 2.75em;
  `}
`;

const Title2 = styled.div`
  padding: 20px 0px;
  color: ${black};
  font-size: 1.2em;
  font-weight: 500;
  ${above.smallPhone`
    font-size: 1.5em;
  `}
  ${above.phone`
    font-size: 2em;
  `}
`;

const Intro = styled.div`
  line-height: 1.2em;
  padding: 5px 0px;
  color: ${black};
  font-size: 1.3em;
  font-weight: 400;
  ${above.smallPhone`
    font-size: 1.3em;
  `}
  ${above.phone`
    font-size: 1.3em;
  `}
`;

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { repositories } = this.props;
    const orderedKeys = Object.keys(repositories).sort()
    const fqrnStyle = {
      width: '100%',
      height: '100%'
    };
    const nameStyle = {
      left: 0,
      width: '100%',
      height: '100%',
      display: 'inline-block',
      color: 'DarkBlue',
      position: 'absolute',
      'text-indent': '19em'
    };
    console.log(repositories);

    const repositoriesList = orderedKeys.map(key => {
      return (
        <div key={repositories[key].fqrn} style={{position: 'relative'}}>
          <Link className="repository-name" to={"/" + repositories[key].fqrn}>
          <span style={fqrnStyle}>{repositories[key].fqrn}</span><span style={nameStyle}><small>{repositories[key].name}</small></span>
          </Link>
        </div>
      );
    });


    return (
      <Main>
        <Title>CernVM-FS Repository Monitor</Title>
        <Intro>
          This is a website for monitoring CernVM-FS repositories.<br />
          It provides basic information about a repository and its status, notably Stratum1 replication status.
        </Intro>
        <Intro>
          Do not see your repository here?
          <br />Follow these steps to subscribe your repository to this monitoring app:
          <ol>
            <li>Provide metainfo for your repository (see <a href="https://cvmfs.readthedocs.io/en/latest/cpt-servermeta.html">https://cvmfs.readthedocs.io/en/latest/cpt-servermeta.html</a>)</li>
            <li>Register your repository by adding a file to <a href="https://github.com/cvmfs/monitor-repos">cvmfs/monitor-repos</a> Github repository.<br />You can open a pull request, we will merge it.</li>
          </ol>
        </Intro>
        <Title2>Registered Repositories</Title2>
        <div className="list">{repositoriesList}</div>
      </Main>
    );
  }
}

const mapStateToProps = state => {
  return {
    repositories: state.repositories
  };
};

export default connect(
  mapStateToProps
)(Home);
