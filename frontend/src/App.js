import React from "react";
import GlobalStyle from "./Global";
import Header from "./layouts/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Page404 from "./components/Page404";
import Details from "./components/Details";
import Browser from "./components/Browser";
import Footer from "./layouts/Footer";
require("dotenv").config();

function App() {
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

export default App;
