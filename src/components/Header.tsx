import React from "react";
import styled from "@emotion/styled";
import { Link } from "@reach/router";
import { FaCheck, FaTimes } from "react-icons/fa";

import Logo from "../images/logo.png";
import { containerWidth } from "../layout";
import { bgSecondary } from "../theme";

const Styled = {
  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: ${bgSecondary};
  `,
  LogoContainer: styled.div`
    flex-grow: 1;
  `,
  TitleContainer: styled.div`
    flex: 0 1 ${containerWidth};
  `,
  RightSpace: styled.div`
    flex-grow: 1;
  `,
  Title: styled.h1``,
  Status: styled.h3``,
  Logo: styled.img``,
  RightHanger: styled.div`
    position: absolute;
    top: 0;
    right: 0;
  `,
  LogOutButton: styled(Link)``,
  StatusIconWrapper: styled.span``,
  ConnectedIcon: styled(FaCheck)``,
  DisconnectedIcon: styled(FaTimes)``,
};

type HeaderProps = {
  connected: boolean;
};

/**
 * Shows the header that is present at the top of each dashboard screen,
 * including the connected state
 */
function Header({ connected }: HeaderProps) {
  return (
    <Styled.Header>
      <Styled.LogoContainer>
        <Styled.Logo src={Logo} />
      </Styled.LogoContainer>
      <Styled.TitleContainer>
        <Styled.Title>Insights Dashboard</Styled.Title>
        <Styled.Status>
          Status: <StatusIcon connected={connected} />{" "}
          {connected ? "Connected" : "Not connected"}
        </Styled.Status>
      </Styled.TitleContainer>
      <Styled.RightSpace />
      <Styled.RightHanger>
        <Styled.LogOutButton to="/">Log Out</Styled.LogOutButton>
      </Styled.RightHanger>
    </Styled.Header>
  );
}

export default Header;

// ? ==============
// ? Sub-components
// ? ==============

type StatusIconProps = {
  connected: boolean;
};

/**
 * Shows a different colored icon depending on the connection status
 */
function StatusIcon({ connected }: StatusIconProps) {
  return (
    <Styled.StatusIconWrapper>
      {connected ? <Styled.ConnectedIcon /> : <Styled.DisconnectedIcon />}
    </Styled.StatusIconWrapper>
  );
}
