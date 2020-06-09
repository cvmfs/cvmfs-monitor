import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { black, above } from "../utilities";
import { Input } from "../elements";
import { connect } from "react-redux";

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
    const orderedKeys = Object.keys(repositories).sort()
    console.log(repositories);

    const repositoriesList = orderedKeys.map(key => {
      return (
        <div key={repositories[key].fqrn}>
          <Link className="repository-name" to={"/" + repositories[key].fqrn}>
            {repositories[key].name}
          </Link>
        </div>
      );
    });


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

export default connect(
  mapStateToProps
)(Home);
