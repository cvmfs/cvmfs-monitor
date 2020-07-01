import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import prettyBytes from "pretty-bytes";

import Alert from "../elements/Alert";
import Title from "../elements/Title";
import Box from "../elements/Box";
import Page from "../elements/Page";
import { Button } from "../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  gray,
  athensGrey,
  black,
  darkerGray,
} from "../utilities";

import {
  faAngleDown,
  faAngleUp,
  faSpinner,
  faFile,
  faFolder,
  faLink,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

const nameColspan = 6;
const sizeColspan = 2;
const lastModifiedColspan = 2;

function formatDate(unixTimestamp) {
  let d = new Date(unixTimestamp * 1000);
  return d.toUTCString();
};

class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: "",
      stat: null,
      isLoading: true,
      showCounters: false,
      counters: {},
    };
  }

  componentDidMount() {
    if (this.props.repository !== undefined) {
      this.updatePath("");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.repository === undefined && this.props.repository !== undefined) {
      this.updatePath("");
    }
  }

  updatePath(path) {
    this.setState({ isLoading: true });
    axios
    .get(process.env.REACT_APP_PRODUCTION_API + "/stat/" + this.props.repository.fqrn + path, {
      params: {
        repoUrl:
          this.props.repository !== undefined
            ? this.props.repository.url
            : this.setState({ error: true })
      }
    })
    .then(result => {
      this.setState({
        currentPath: path,
        stat: result.data,
        isLoading: false,
      });

      if(path === "") {
        this.setState({
          counters: result.data.catalog.counters,
        });
      }
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
    return process.env.REACT_APP_PRODUCTION_API +
           "/fetch/" + this.props.repository.fqrn +
           this.state.currentPath +
           "/" + filename;
  }

  render() {
    if (this.state.isLoading === true || this.props.isFetching === true) {
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
          <Title>Repository browser - {this.props.repository.fqrn}</Title>
          <Alert>INTERACTIVE USE ONLY - please do not use this browser in your scripts,
            as it is not designed to handle large number of requests.</Alert>
          <table>
            <thead>
              <tr>
                <th className="table-title" colSpan={2}>
                  current path : {this.state.currentPath}
                  <Button style={{background: athensGrey, color: black, float: "right", padding: "1px 10px"}}
                          onClick={this.handleToggleCounters} >
                    counters
                    {
                      this.state.showCounters ? (
                        <FontAwesomeIcon
                          icon={faAngleUp}
                          style={{ color: black, paddingLeft: 10 }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          style={{ color: black, paddingLeft: 10 }}
                        />
                      )
                    }
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.showCounters === true ? (
                  this.formatCounters(this.state.counters).map(([name, val]) => (
                    <tr>
                      <td>{name}</td>
                      <td>{val}</td>
                    </tr>
                  ))
                ) : (
                  ""
                )
              }
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colspan={nameColspan}>name</th>
                <th colspan={sizeColspan}>size</th>
                <th colspan={lastModifiedColspan}>last modified</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.currentPath !== "" ?
                (
                  <tr>
                    <td colspan={nameColspan}>
                      <a href="#" onClick={() => this.updatePathRelative("..")}>..</a>
                    </td>
                    <td colspan={sizeColspan}>
                    </td>
                    <td colspan={lastModifiedColspan}>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              }
              {this.state.stat.ls.map(object => (
                <>
                  <tr>
                    <td colspan={nameColspan}>
                      {
                        object.is_dir === true ? (
                          <>
                            <a href="#" onClick={() => this.updatePathRelative(object.name)}>
                              <FontAwesomeIcon icon={faFolder} color={black} /> {object.name}
                            </a>
                            {
                              object.is_catalog === true ? (
                                <>
                                  <ReactTooltip />
                                  <FontAwesomeIcon
                                    title="directory contains a nested catalog"
                                    style={{paddingLeft: 5}} icon={faDatabase} color={gray} />
                                </>
                              ) : (
                                ""
                              )
                            }
                          </>
                        ) : (
                          object.is_link === true ? (
                            <>
                              <FontAwesomeIcon icon={faLink} color={black} /> {object.name}
                              <span style={{float: "right", color: darkerGray}}>{object.link_dest}</span>
                            </>
                          ) : (
                            <a href={this.getFetchLinkRelative(object.name)}>
                              <FontAwesomeIcon icon={faFile} color={black} /> {object.name}
                            </a>
                          )
                        )
                      }
                    </td>
                    <td colspan={sizeColspan}>
                      {prettyBytes(object.size)}
                    </td>
                    <td colspan={lastModifiedColspan}>
                      {formatDate(object.mtime)}
                    </td>
                  </tr>
                </>
              ))
              }
            </tbody>
          </table>
        </Box>
      );
    }
  }

  handleToggleCounters = () => {
    this.setState(state => ({
      showCounters: !state.showCounters
    }));
  }

  formatCounters(counters) {
    let result = [
      ["Regular files", counters.regular],
      ["Directories", counters.dir],
      ["Symlinks", counters.symlink],
      ["Nested catalogs", counters.nested],
      ["Chunked files", counters.chunked],
      ["File chunks", counters.chunks],
      ["Total file size", prettyBytes(counters.file_size)],
      ["Size of chunked files", prettyBytes(counters.chunked_size)],
      ["External files", counters.external],
      ["External file size", prettyBytes(counters.external_file_size)],
    ];
    return result;
  }

}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.repository_name;
  return {
    repository: state.repositories[id],
    isFetching: state.isFetching
  };
};

export default connect(
    mapStateToProps
  )(Browser);