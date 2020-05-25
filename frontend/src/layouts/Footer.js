import React from "react";
import styled from "styled-components";
import { roboto, shadows, gray, whiteSmoke } from "../utilities";

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <div className="text">
        <a className="copyright" href="https://copyright.web.cern.ch/">
          Copyright
        </a>
        © 2019 CERN
      </div>
    </footer>
  );
};

export default styled(Footer)`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: ${gray};
  padding: 10px 5%;
  width: 100%;
  color: ${whiteSmoke};
  ${roboto};
  ${shadows[2]};
  .text {
    color: ${whiteSmoke};
    font-size: 0.75em;
  }
  .copyright {
    color: ${whiteSmoke};
    padding: 0px 5px 0px 0px;
    text-decoration: none;
  }
`;
