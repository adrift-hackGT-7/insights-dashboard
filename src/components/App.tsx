import React from "react";
import styled from "@emotion/styled";
import { Router, Redirect } from "@reach/router";

import Login from "./Login";
import Dashboard from "./Dashboard";
import NcrLogo from "../images/ncr-logo.png";
import { bgTertiary, borderColor } from "../theme";

const Styled = {
  Wrapper: styled.div`
    background-color: #ffffff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start
    ;
  `,
  TopHeader: styled.div`
    background-color: ${bgTertiary};
    border-bottom: 1px solid ${borderColor};
    height: 48px;
    flex-shrink: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  `,
  NcrLogo: styled.img`
    height: 24px;
    width: auto;
    opacity: 0.15;
  `,
  Router: styled(Router)`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    overflow-y: hidden;
  `,
};

/**
 * Main app root component
 */
function App() {
  return (
    <Styled.Wrapper>
      <Styled.TopHeader><Styled.NcrLogo src={NcrLogo} /></Styled.TopHeader>
      <Styled.Router>
        <Login path="/" />
        <Dashboard path="/dashboard/*" />
        <Redirect from="*" to="/" default noThrow />
      </Styled.Router>
    </Styled.Wrapper>
  );
}

export default App;
