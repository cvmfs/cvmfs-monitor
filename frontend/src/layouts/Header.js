import React from "react";
import styled from "styled-components";
import { fixed, roboto, shadows, white, gray, darkGray } from "../utilities";
import { Link } from "react-router-dom";
import logo from "../img/cvmfs_logo@2x.png";

const Header = ({ className }) => {
  return (
    <header className={className}>
      <img className="logo" src={logo} alt="Logo" />
      <div>
        <Link className="item" to="/">
          Replication Monitor
        </Link>
      </div>
    </header>
  );
};

export default styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background: ${gray};
  padding: 10px 5%;
  width: 100%;
  color: ${white};
  ${roboto};
  ${fixed()};
  ${shadows[2]};
  z-index: 9999;
  .logo {
    width: 36px;
  }
  .item {
    padding: 0px 10px;
    text-decoration: none;
    color: ${darkGray};
    font-size: 1.25em;
    &:hover {
      color: ${white};
    }
  }
`;
