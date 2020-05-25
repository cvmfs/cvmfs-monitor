import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { black, above } from "../utilities";
import { Input } from "../elements";
import { connect } from "react-redux";
import { getRepository } from "../actions/getRepository";

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

class Home extends Component {
  state = { search: "" };
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { repositories } = this.props;
    const { search } = this.state;

    const alphabetiseRepositories = [...repositories].sort(function(a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    const findRepository = alphabetiseRepositories.filter(repository => {
      return repository.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const repositoriesList = findRepository.length ? (
      findRepository.map(repository => {
        return (
          <div key={repository.id}>
            <Link className="repository-name" to={"/" + repository.url}>
              {repository.name}
            </Link>
          </div>
        );
      })
    ) : (
      <div className="repository-name">Unknown repository</div>
    );

    return (
      <Main>
        <Title>Registered Repositories</Title>
        <Input
          onChange={this.handleChange}
          value={search}
          placeholder="search"
        />
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

const mapDispatchToProps = dispatch => {
  return {
    getRepository: id => {
      dispatch(getRepository(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
