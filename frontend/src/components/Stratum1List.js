import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTimes,
  faCheck,
  // faAngleDown,
  // faAngleUp,
  faExclamationTriangle,
  // faSpinner
} from "@fortawesome/free-solid-svg-icons";

import {
  // black,
  // shipGrey,
  // athensGrey,
  // grey,
  // gravel,
  // roboto,
  green,
  red,
  yellow,
  // above,
  // white,
  // gray
} from "../utilities";

import moment from "moment";


class Stratum1List extends Component {
  constructor(props) {
    super(props);
    this.state = {
        details: false,
    };
  }

  render() {
    return (
      <div className="grid">
        {this.props.repositoryData.recommendedStratum1s.map(stratumOne => (
          <div key={stratumOne.id} className="card">
            <div className="img">
              {stratumOne.health === "green" ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: green, padding: "2px" }}
                  size="2x"
                />
              ) : stratumOne.health === "red" ? (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: red, padding: "7px" }}
                  size="2x"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  style={{ color: yellow }}
                  size="2x"
                />
              )}
            </div>

            <div className="content">
              <div className="card-title">
                {stratumOne.hasOwnProperty("name")
                  ? stratumOne.name
                  : "lack of data"}
              </div>
              <div className="details revision">
                <span className="revision">Revision: </span>
                {stratumOne.hasOwnProperty("revision")
                  ? stratumOne.revision
                  : "Revision: lack of data"}
              </div>
              <div className="details">
                {stratumOne.hasOwnProperty("publishedTimestamp")
                  ? "Last Modified: " +
                    moment
                      .unix(stratumOne.publishedTimestamp)
                      .format("Do MMMM YYYY h:mm:ss a")
                  : "Last Modified: lack of data"}
              </div>
              <div className="details">
                {stratumOne.hasOwnProperty("url")
                  ? stratumOne.url
                  : "lack of data"}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Stratum1List;
