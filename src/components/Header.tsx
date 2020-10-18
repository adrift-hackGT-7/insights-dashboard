import React from "react";
import styled from "@emotion/styled";
import { Link } from "@reach/router";
import { FaCheck, FaTimes } from "react-icons/fa";

import Logo from "../images/logo.png";
import { containerWidth } from "../layout";
import { bgSecondary, uiBlue, uiGreen, uiRed } from "../theme";

const Styled = {
  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: ${bgSecondary};
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `,
  LogoContainer: styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  TitleContainer: styled.div`
    padding: 48px 0;
    flex: 0 1 ${containerWidth};
  `,
  RightSpace: styled.div`
    align-self: stretch;
    flex: 1 1 0;
  `,
  Title: styled.h1`
    margin-top: 0;
    margin-bottom: 4px;

    font-weight: normal;
    font-size: 34px;
    line-height: 40px;
    letter-spacing: -0.05em;
  `,
  Status: styled.h3`
    margin-top: 0;
    margin-bottom: 0;

    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.006em;
  `,
  Logo: styled.img`
    height: 100px;
    width: auto;
  `,
  RightHanger: styled.div`
    position: absolute;
    top: 24px;
    right: 24px;
  `,
  LogOutButton: styled(Link)`
    display: inline-block;
    padding: 10px 26px;
    border: 1px solid ${uiBlue};
    box-sizing: border-box;
    border-radius: 8px;
    color: ${uiBlue};
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
    text-decoration: none;

    transition: all 0.125s linear;
    &:hover {
      background-color: ${uiBlue};
      color: white;
    }
  `,
  StatusIconWrapper: styled.span`
    display: inline-block;
    vertical-align: -2px;

    svg {
      transform: scale(1.1);
    }
  `,
  ConnectedIcon: styled(FaCheck)`
    color: ${uiGreen};
    margin: 0 4px;
  `,
  DisconnectedIcon: styled(FaTimes)`
    color: ${uiRed};
    margin: 0 3px;
  `,
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
