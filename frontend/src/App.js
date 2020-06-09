import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import GlobalStyle from "./Global";
import Header from "./layouts/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Page404 from "./components/Page404";
import Details from "./components/Details";
import Browser from "./components/Browser";
import Footer from "./layouts/Footer";
require("dotenv").config();

function receiveRepoList(repolist) {
  return {
    type: 'RECEIVE_REPOLIST',
    repolist
  };
};

class App extends Component {

  getRepoList(dispatch) {
    var response = []
    axios
    .get(process.env.REACT_APP_PRODUCTION_API + "/repos")
    .then(result => {
      let repoList = result.data;
      let repoDict = {}
      repoList.repositories.forEach( val => {
        repoDict[val.fqrn] = val;
      });

      dispatch(receiveRepoList(repoDict));
    })
    .catch(error => {
      console.log("Error when getting repolist");
    });
    return response
  };

  componentDidMount() {
    this.getRepoList(this.props.dispatch);
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:repository_name" component={Details} />
          <Route exact path="/browse/:repository_name" component={Browser} />
          <Route component={Page404} />
        </Switch>
        <GlobalStyle />
        <Footer />
      </BrowserRouter>
    );
  }
};

export default connect()(App);
