import React from "react";
import styled from "@emotion/styled";
import { Link, RouteComponentProps } from "@reach/router";

import Logo from "../images/logo.png";
import PoweredBy from "./PoweredBy";
import { containerWidth } from "../layout";

const Styled = {
  Container: styled.div`
    margin: 0 auto;
    max-width: ${containerWidth};
    padding-top: 128px;
    padding-bottom: 64px;
  `,
  Logo: styled.img``,
  Title: styled.h1``,
  Input: styled.input``,
  ButtonRow: styled.div``,
  Button: styled(Link)``,
  Powered: styled.span``,
  NcrLogo: styled.img``,
  Footer: styled.footer``,
};

/**
 * Main home page that displays the login box,
 * which unconditionally proceeds to the next screen
 * as long as a login is given
 */
function Login(_: RouteComponentProps) {
  return (
    <Styled.Container>
      <Styled.Logo src={Logo} />
      <Styled.Title>Insights Dashboard Login</Styled.Title>
      <Styled.Input />
      <Styled.Input />
      <Styled.ButtonRow>
        <Styled.Button to="/dashboard">Log In</Styled.Button>
      </Styled.ButtonRow>
      <Styled.Footer>
        <PoweredBy />
      </Styled.Footer>
    </Styled.Container>
  );
}

export default Login;
