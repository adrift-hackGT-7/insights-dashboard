import React from "react";
import styled from "@emotion/styled";
import { Router, Redirect } from "@reach/router";

import Login from "./Login";
import Dashboard from "./Dashboard";

const Styled = {
  Wrapper: styled.div`
    background-color: #ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  `,
};

/**
 * Main app root component
 */
function App() {
  return (
    <Styled.Wrapper>
      <Router>
        <Login path="/" />
        <Dashboard path="/dashboard/*" />
        <Redirect from="*" to="/" default noThrow />
      </Router>
    </Styled.Wrapper>
  );
}

export default App;
