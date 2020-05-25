import React from "react";
import styled from "styled-components";
import { roboto} from "../utilities";

const Main = styled.div`
    display: flex;
    height: calc(100vh - 100px);
    align-items: center;
    justify-content: center;
    margin: 0px 10px;
    h1{
        margin: 0;
        font-size: 5em;
        ${roboto};
    }
`;

const Page404 = () => {
  return (
    <Main>
      <h1>PAGE 404</h1>
    </Main>
  );
};

export default Page404;
