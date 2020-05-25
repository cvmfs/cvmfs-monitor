import React, { Component } from "react";
import styled from "styled-components";
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
import { getRepository } from "../actions/getRepository";
import { connect } from "react-redux";
import {
  faTimes,
  faCheck,
  faAngleDown,
  faAngleUp,
  faExclamationTriangle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { Button } from "../elements";
import MapComponent from "../components/MapComponent";

const Box = styled.div`
  max-width: 1200px;
  min-height: calc(100vh - 94px);
  margin: 0px 10px;
  ${above.desktop`
    margin: 0 auto;
  `}

  table {
    margin: 20px 0px;
    width: 100%;
    border-spacing: 0;
    overflow: hidden;
    border-radius: 10px;
    ${above.phone`
      border-radius: 20px;
    `}
  }
  th,
  td {
    text-align: left;
    border-bottom: 1px solid ${gravel};
    padding: 0.25rem;
    background: ${grey};
    ${roboto};
    padding: 10px 5px;
    font-size: 0.6em;
    ${above.smallPhone`
      font-size: 0.75em;
    `}
    ${above.phone`
      padding: 10px 12px;
      font-size: 1em;
    `}
  }
  tr td:first-child {
    width: 125px;
    ${above.phone`
      width: 150px;
    `};
    ${above.tablet`
      width: 300px;
    `}
  }
  .table-title {
    font-size: 1.25em;
    font-weight: 600;
    background: ${shipGrey};
    color: ${athensGrey};
    ${roboto};
    padding: 10px 15px;
  }
  .tabel-details {
    display: none;
  }
  .two-tab-elem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 5px;
    ${above.phone`
      padding: 10px 15px;
    `}
    &.error {
      color: ${red};
      font-weight: 600;
    }
  }
  .grid {
    ${above.tablet`
      display: flex;
      flex-wrap: wrap;
    `}
  }
  .card:nth-child(odd) {
    ${above.tablet`
      margin-right: 5px;
    `}
  }
  .card:nth-child(even) {
    ${above.tablet`
      margin-left: 5px;
    `}
  }
  .card-title {
    font-size: 0.9em;
    font-weight: 600;
    ${roboto};
    padding: 7px 0px;
    ${above.smallPhone`
      font-size: 1em;
    `}
    ${above.phone`
      padding: 10px 0px;
    `}
  }
  .card {
    display: flex;
    align-items: center;
    border-radius: 20px;
    margin-bottom: 10px;
    background: ${grey};
    flex: 1 1 calc(50% - 10px);
  }
  .img {
    padding: 1em;
    ${above.smallPhone`
      padding: 1.5em;
    `}
    ${above.tablet`
      padding: 2em;
    `}
  }
  .content {
    width: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    ${roboto};
  }
  .details {
    padding: 7px 0px;
    font-size: 0.65em;
    ${above.smallPhone`
      font-size: 0.75em;
    `}
    ${above.phone`
      font-size: 1em;
      padding: 10px 0px;
    `}
    &.revision {
      font-weight: 600;
    }
  }
  .revision {
    font-weight: normal;
  }
  .link {
    color: ${black};
    display: inline-block;
    width: 210px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    ${above.smallPhone`
      width: 250px;
    `}
    ${above.phone`
      width: 370px;
    `}
    ${above.tablet`
    width: 100%;
    `}
  }
`;

const Page = styled.div`
  display: flex;
  height: calc(100vh - 94px);
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
  flex-direction: column;
`;

const Title = styled.div`
  padding-top: 20px;
  color: ${black};
  font-size: 1.75em;
  font-weight: 500;
  ${roboto};
  ${above.smallPhone`
    font-size: 2em;
  `}
  ${above.phone`
    font-size: 2.75em;
  `}
  &.page404 {
    padding-top: 0px;
    font-size: 7.5em;
    ${above.phone`
      font-size: 10em;
    `}
  }
`;

const Subtitle = styled.div`
  padding: 0px 15px 20px;
  color: ${black};
  font-size: 1.25em;
  font-weight: 600;
  ${roboto};
`;

const ErrorTitle = styled.div`
  ${roboto};
  color: ${black};
  font-size: 0.65em;
  text-align: center;
  ${above.smallPhone`
    font-size: 0.75em;
  `}
  ${above.phone`
      font-size: 1.25em;
  `}
`

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoryData: null,
      isLoading: false,
      error: null,
      details: false,
      errorMessage: null 
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(process.env.REACT_APP_PRODUCTION_API + "/" + this.props.repository.url, {
        params: {
          repoUrl:
            this.props.repository !== undefined
              ? this.props.repository.repositoryWebsite
              : this.setState({ error: true })
        }
      })
      .then(result => {
        const repositoryDownloadData = result.data;
        const certificateBlob = new Blob([result.data.download.certificate], {type: 'application/x-pem-file'});
        const metinfoBlob = new Blob([result.data.download.metainfo], {type: 'text/json'});
        repositoryDownloadData.download.certificate = window.URL.createObjectURL(certificateBlob);
        repositoryDownloadData.download.metainfo = window.URL.createObjectURL(metinfoBlob);
        this.setState({ repositoryData: repositoryDownloadData, isLoading: false });
        // console.log(result)
      })
      .catch(error => {
        this.setState({ error: true });
        this.setState({ errorMessage: error.response !== undefined ? error.response.data : "" });
      });
  }

  handleClick = () => {
    this.setState(state => ({
      details: !state.details
    }));
  };

  render() {
    const { repository } = this.props;
    const { repositoryData, error, details, errorMessage } = this.state;

    if (error) {
      return (
        <Page>
          <Title className="page404">404</Title>
          <ErrorTitle>{errorMessage}</ErrorTitle>
        </Page>
      );
    }

    if (this.state.repositoryData === null) {
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
          <Title>{repository.name}</Title>
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
                {repositoryData.recommendedStratum0.hasOwnProperty(
                  "revision"
                ) ? (
                  <td>{repositoryData.recommendedStratum0.revision}</td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>
              <tr>
                <td>Oldest Stratum1 Revision</td>
                {repositoryData.hasOwnProperty("oldestRevisionStratumOne") ? (
                  <td>{repositoryData.oldestRevisionStratumOne}</td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>
              <tr>
                <td>Last Modified</td>
                {repositoryData.recommendedStratum0.hasOwnProperty(
                  "publishedTimestamp"
                ) ? (
                  <td>
                    {moment
                      .unix(
                        repositoryData.recommendedStratum0.publishedTimestamp
                      )
                      .format("Do MMMM YYYY h:mm:ss a")}
                  </td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>
              <tr>
                <td>Whitelist Expiry Date</td>
                {repositoryData.hasOwnProperty("whitelistExpiryDate") ? (
                  <td className={repositoryData.expiryDate ? "two-tab-elem" : "two-tab-elem error"}>
                    {repositoryData.whitelistExpiryDate}
                    <Button modifiers={["more"]} onClick={this.handleClick}>
                      {details ? (
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
                  <td>lack of data</td>
                )}
              </tr>

              <tr className={details ? "" : "tabel-details"}>
                <td>Url</td>
                {repositoryData.hasOwnProperty("url") ? (
                  <td>{repositoryData.url}</td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>

              <tr className={details ? "" : "tabel-details"}>
                <td>Contact</td>
                {repositoryData.hasOwnProperty("email") ? (
                  <td>{repositoryData.email}</td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>

              <tr className={details ? "" : "tabel-details"}>
                <td>rootHash</td>
                {repositoryData.hasOwnProperty("rootHash") ? (
                  <td>{repositoryData.rootHash}</td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>

              <tr className={details ? "" : "tabel-details"}>
                <td>Catalog</td>
                {repositoryData.download.hasOwnProperty("catalog") ? (
                  <td>
                    <a
                      href={repositoryData.download.catalog}
                      className={"link"}
                    >
                      {repositoryData.download.catalog}
                    </a>
                  </td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>

              <tr className={details ? "" : "tabel-details"}>
                <td>Certificate</td>
                {repositoryData.download.hasOwnProperty("certificate") ? (
                  <td>
                    <a
                      href={repositoryData.download.certificate}
                      className={"link"}
                      download="certificate.pem"
                    >
                      Download
                    </a>
                  </td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>
              <tr className={details ? "" : "tabel-details"}>
                <td>Manifest</td>
                {repositoryData.download.hasOwnProperty("manifest") ? (
                  <td>
                    <a
                      href={repositoryData.download.manifest}
                      className={"link"}
                    >
                      {repositoryData.download.manifest}
                    </a>
                  </td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>
              <tr className={details ? "" : "tabel-details"}>
                <td>Metainfo</td>
                {repositoryData.download.hasOwnProperty("metainfo") ? (
                  <td>
                    <a
                      href={repositoryData.download.metainfo}
                      className={"link"}
                      download="metainfo.json"
                    >
                      Download
                    </a>
                  </td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>
              <tr className={details ? "" : "tabel-details"}>
                <td>Whitelist</td>
                {repositoryData.download.hasOwnProperty("whitelist") ? (
                  <td>
                    <a
                      href={repositoryData.download.whitelist}
                      className={"link"}
                    >
                      {repositoryData.download.whitelist}
                    </a>
                  </td>
                ) : (
                  <td>lack of data</td>
                )}
              </tr>
            </tbody>
          </table>
          <Subtitle>Stratum 1</Subtitle>
          <div className="grid">
            {repositoryData.recommendedStratum1s.map(stratumOne => (
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
          <MapComponent repositoryData={repositoryData} />
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
)(Details);
