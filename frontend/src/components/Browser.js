import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";


import Title from "../elements/Title";
import Box from "../elements/Box";
import Page from "../elements/Page";
// import { Button } from "../elements";
// import { Path } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  // black,
  // shipGrey,
  // athensGrey,
  // grey,
  // gravel,
  // roboto,
  // green,
  // red,
  // yellow,
  // above,
  // white,
  gray
} from "../utilities";

import {
  // faTimes,
  // faCheck,
  // faAngleDown,
  // faAngleUp,
  // faExclamationTriangle,
  faSpinner,
  faFile,
  faFolder
} from "@fortawesome/free-solid-svg-icons";

class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: "",
      stat: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.updatePath("");
  }

  updatePath(path) {
    this.setState({ isLoading: true });
    axios
    .get(process.env.REACT_APP_PRODUCTION_API + "/stat/" + this.props.repository.url + path, {
      // params: {
        // repoUrl:
          // this.props.repository !== undefined
            // ? this.props.repository.repositoryWebsite
            // : this.setState({ error: true })
      // }
    })
    .then(result => {
      this.setState({
        currentPath: path,
        stat: result.data,
        isLoading: false
      });
    })
    .catch(error => {
      this.setState({ error: true });
      this.setState({ errorMessage: error.response !== undefined ? error.response.data : "" });
    });
  }

  updatePathRelative(filename) {
    if (filename === "..") {
      if (this.state.currentPath === "") {
        return;
      }
      this.updatePath(this.state.currentPath.substring(0, this.state.currentPath.lastIndexOf("/")));
    } else {
      this.updatePath(this.state.currentPath + "/" + filename);
    }
  }

  getFetchLinkRelative(filename) {
    return process.env.REACT_APP_PRODUCTION_API + "/fetch/" + this.props.repository.url + this.state.currentPath + "/" + filename;
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <Page>
          <FontAwesomeIcon
            icon={faSpinner}
            style={{ color: gray }}
            size="6x"
            className="fa-spin"
          />
        </Page>
      );
    } else {
      return (
        <Box>     
          <Title>Repository browser - {this.props.repository.url}</Title>
          <table>
            <thead>
              <tr>
                <th classname="table-title" colspan="2">
                  current path : {this.state.currentPath}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.currentPath !== "" ?
                (
                  <tr>
                    <td>
                      <a href="#" onClick={() => this.updatePathRelative("..")}>..</a>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              }
              {this.state.stat.ls.map(object => (
                <tr>
                  <td>
                    {
                      object.is_dir === true ? (
                        <a href="#" onClick={() => this.updatePathRelative(object.name)}>
                          <FontAwesomeIcon icon={faFolder} /> {object.name}
                        </a>
                      ) : (
                        <a href={this.getFetchLinkRelative(object.name)}>
                          <FontAwesomeIcon icon={faFile} /> {object.name}
                        </a>
                      )
                    }
                  </td>
                </tr>
              ))

              }
            </tbody>
          </table>
        </Box>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.repository_name;
  return {
    repository: state.repositories.find(repository => repository.url === id)
  };
};

export default connect(
    mapStateToProps
  )(Browser);