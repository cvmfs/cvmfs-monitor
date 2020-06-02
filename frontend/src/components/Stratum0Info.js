import React, { Component } from "react";
import moment from "moment";
import { Button } from "../elements";
import {
  faTimes,
  faCheck,
  faAngleDown,
  faAngleUp,
  faExclamationTriangle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";


import {
  black,
  shipGrey,
  athensGrey,
  grey,
  gravel,
  roboto,
  green,
  red,
  yellow,
  above,
  white,
  gray
} from "../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Stratum0Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
        details: false,
    };
  }
  
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th className="table-title" colSpan="2">
              Stratum 0
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Revision</td>
            {this.props.repositoryData.recommendedStratum0.hasOwnProperty(
              "revision"
            ) ? (
              <td>{this.props.repositoryData.recommendedStratum0.revision}</td>
            ) : (
              <td>not available</td>
            )}
          </tr>
          <tr>
            <td>Oldest Stratum1 Revision</td>
            {this.props.repositoryData.hasOwnProperty("oldestRevisionStratumOne") ? (
              <td>{this.props.repositoryData.oldestRevisionStratumOne}</td>
            ) : (
              <td>not available</td>
            )}
          </tr>
          <tr>
            <td>Last Modified</td>
            {this.props.repositoryData.recommendedStratum0.hasOwnProperty(
              "publishedTimestamp"
            ) ? (
              <td>
                {moment
                  .unix(
                    this.props.repositoryData.recommendedStratum0.publishedTimestamp
                  )
                  .format("Do MMMM YYYY h:mm:ss a")}
              </td>
            ) : (
              <td>not available</td>
            )}
          </tr>
          <tr>
            <td>Whitelist Expiry Date</td>
            {this.props.repositoryData.hasOwnProperty("whitelistExpiryDate") ? (
              <td className={this.props.repositoryData.expiryDate ? "two-tab-elem" : "two-tab-elem error"}>
                {this.props.repositoryData.whitelistExpiryDate}
                <Button modifiers={["more"]} onClick={this.handleClick}>
                  {this.state.details ? (
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      style={{ color: white }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ color: white }}
                    />
                  )}
                </Button>
              </td>
            ) : (
              <td>not available</td>
            )}
          </tr>

          <tr className={this.state.details ? "" : "tabel-details"}>
            <td>Url</td>
            {this.props.repositoryData.hasOwnProperty("url") ? (
              <td>{this.props.repositoryData.url}</td>
            ) : (
              <td>not available</td>
            )}
          </tr>

          <tr className={this.state.details ? "" : "tabel-details"}>
            <td>Contact</td>
            {this.props.repositoryData.hasOwnProperty("email") ? (
              <td>{this.props.repositoryData.email}</td>
            ) : (
              <td>not available</td>
            )}
          </tr>

          <tr className={this.state.details ? "" : "tabel-details"}>
            <td>rootHash</td>
            {this.props.repositoryData.hasOwnProperty("rootHash") ? (
              <td>{this.props.repositoryData.rootHash}</td>
            ) : (
              <td>not available</td>
            )}
          </tr>

          <tr className={this.state.details ? "" : "tabel-details"}>
            <td>Catalog</td>
            {this.props.repositoryData.download.hasOwnProperty("catalog") ? (
              <td>
                <a
                  href={this.props.repositoryData.download.catalog}
                  className={"link"}
                >
                  {this.props.repositoryData.download.catalog}
                </a>
              </td>
            ) : (
              <td>not available</td>
            )}
          </tr>

          <tr className={this.state.details ? "" : "tabel-details"}>
            <td>Certificate</td>
            {this.props.repositoryData.download.hasOwnProperty("certificate") ? (
              <td>
                <a
                  href={this.props.repositoryData.download.certificate}
                  className={"link"}
                  download="certificate.pem"
                >
                  Download
                </a>
              </td>
            ) : (
              <td>not available</td>
            )}
          </tr>
          <tr className={this.state.details ? "" : "tabel-details"}>
            <td>Manifest</td>
            {this.props.repositoryData.download.hasOwnProperty("manifest") ? (
              <td>
                <a
                  href={this.props.repositoryData.download.manifest}
                  className={"link"}
                >
                  {this.props.repositoryData.download.manifest}
                </a>
              </td>
            ) : (
              <td>not available</td>
            )}
          </tr>
          <tr className={this.state.details ? "" : "tabel-details"}>
            <td>Metainfo</td>
            {this.props.repositoryData.download.hasOwnProperty("metainfo") ? (
              <td>
                <a
                  href={this.props.repositoryData.download.metainfo}
                  className={"link"}
                  download="metainfo.json"
                >
                  Download
                </a>
              </td>
            ) : (
              <td>not available</td>
            )}
          </tr>
          <tr className={this.state.details ? "" : "tabel-details"}>
            <td>Whitelist</td>
            {this.props.repositoryData.download.hasOwnProperty("whitelist") ? (
              <td>
                <a
                  href={this.props.repositoryData.download.whitelist}
                  className={"link"}
                >
                  {this.props.repositoryData.download.whitelist}
                </a>
              </td>
            ) : (
              <td>not available</td>
            )}  
          </tr>
        </tbody>
      </table>
    );
  }

  handleClick = () => {
      this.setState(state => ({
        details: !state.details
      }));
  };
}

export default Stratum0Info;