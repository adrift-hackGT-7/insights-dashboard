import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { navigate, RouteComponentProps } from "@reach/router";

import Logo from "../images/logo.png";
import PoweredBy from "./PoweredBy";
import { containerWidth } from "../layout";
import { bgPrimary, borderColor, uiBlue } from "../theme";

const Styled = {
  Container: styled.div`
    margin: 0 auto;
    max-width: ${containerWidth};
    width: 100%;
    padding-top: 96px;
    padding-bottom: 64px;
  `,
  Logo: styled.img`
    height: 110px;
    width: auto;
    margin-bottom: 20px;
  `,
  Title: styled.h1`
    margin-top: 0;
    margin-bottom: 16px;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 34px;
    line-height: 40px;
    letter-spacing: -0.05em;
    color: rgba(0, 0, 0, 0.8);
  `,
  Input: styled.input`
    background: ${bgPrimary};
    display: block;
    width: 100%;
    max-width: 280px;
    margin-bottom: 12px;
    padding: 10px 14px;
    border: 1px solid ${borderColor};
    border-radius: 8px;
    outline: 0;
    transition: all 0.125s linear;
    box-shadow: none;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.006em;

    ${(props) =>
      props.disabled
        ? css`
            opacity: 0.5;
          `
        : ""}

    &:focus {
      border: 1px solid rgba(60, 60, 67, 0.13);

      box-shadow: 0px 0px 8px #a0dffd;
      border-radius: 8px;
    }

    &::placeholder {
      color: rgba(60, 60, 67, 0.3);
    }
  `,
  ButtonRow: styled.div`
    margin-top: 24px;
    display: block;
  `,
  Button: styled.button<{ disabled: boolean }>`
    display: inline-block;
    padding: 10px 26px;
    background-color: ${uiBlue};
    box-sizing: border-box;
    border-radius: 8px;
    border: none;
    outline: none;
    cursor: pointer;
    color: white;
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
    text-decoration: none;
    opacity: 1;
    min-width: 100px;
    min-height: 36px;

    transition: all 0.125s linear;
    &:hover {
      opacity: 0.85;
    }

    ${(props) =>
      props.disabled
        ? css`
            opacity: 0.5;
            pointer-events: none;
          `
        : ""}
  `,
  Footer: styled.footer`
    margin-top: 48px;
  `,
  Loader: styled.span`
    display: block;

    width: 1rem;
    height: 1rem;
    border: 3px solid white;
    border-left-color: transparent;
    border-radius: 1000rem;
    animation: spin infinite linear 1.5s;
    margin: 0 auto;

    @keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  `,
};

/**
 * Main home page that displays the login box,
 * which unconditionally proceeds to the next screen
 * as long as a login is given
 */
function Login(_: RouteComponentProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogIn = (event: React.FormEvent<HTMLFormElement>) => {
    if (!disabled) {
      // Start loading
      setLoading(true);
      setTimeout(() => {
        setLoading(!false);
        navigate('/dashboard');
      }, 500);
    }

    event.preventDefault();
  };

  const disabled = username === "" || password === "" || loading;
  return (
    <Styled.Container>
      <Styled.Logo src={Logo} />
      <Styled.Title>Insights Dashboard Login</Styled.Title>
      <form onSubmit={handleLogIn}>
        <Styled.Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          disabled={loading}
        />
        <Styled.Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
        />
        <Styled.ButtonRow>
          <Styled.Button
            disabled={disabled}
            tabIndex={disabled ? -1 : undefined}
            type="submit"
          >
            {loading ? <Styled.Loader /> : "Log In"}
          </Styled.Button>
        </Styled.ButtonRow>
      </form>
      <Styled.Footer>
        <PoweredBy />
      </Styled.Footer>
    </Styled.Container>
  );
}

export default Login;
