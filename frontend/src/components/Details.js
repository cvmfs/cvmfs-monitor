import React, { Component } from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";
import {
  black,
  // shipGrey,
  // athensGrey,
  // grey,
  // gravel,
  roboto,
  // green,
  // red,
  // yellow,
  above,
  // white,
  gray
} from "../utilities";
import { connect } from "react-redux";
import {
  // faTimes,
  // faCheck,
  // faAngleDown,
  // faAngleUp,
  // faExclamationTriangle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button } from "../elements";
import MapComponent from "../components/MapComponent";
import Stratum0Info from "../components/Stratum0Info";
import Stratum1List from "../components/Stratum1List";
import Title from "../elements/Title";
import Box from "../elements/Box";
import Page from "../elements/Page";

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
      .get(process.env.REACT_APP_PRODUCTION_API + "/details/" + this.props.repository.fqrn, {
        params: {
          repoUrl:
            this.props.repository !== undefined
              ? this.props.repository.url
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
      })
      .catch(error => {
        this.setState({ error: true });
        this.setState({ errorMessage: error.response !== undefined ? error.response.data : "" });
      });
  }

  render() {
    const repository = this.props.repository;
    const { repositoryData, error, details, errorMessage } = this.state;
    if (error || repository === undefined) {
      return (
        <Page>
          <Title className="page404">404</Title>
          <ErrorTitle>{errorMessage}</ErrorTitle>
        </Page>
      );
    }

    if (this.state.repositoryData === null || this.props.isFetching) {
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
          <Link to={"/browse/" + repository.fqrn} >
            <Button>
              Browse this repository (experimental)
            </Button>
          </Link>
          <Stratum0Info repositoryData={repositoryData} />
          <Subtitle>Stratum 1</Subtitle>
          <Stratum1List repositoryData={repositoryData} />
          <MapComponent repositoryData={repositoryData} />
        </Box>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.repository_name;
  return {
    repositories: state.repositories,
    repository: state.repositories[id],
    isFetching: state.isFetching
  };
};

export default connect(mapStateToProps)(Details);
