import React from 'react';
import logo from './logo.svg';
import styled from "@emotion/styled";

const Styled = {
  App: styled.div`
    text-align: center;
  `,
  AppHeader: styled.header`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  `,
  AppLogo: styled.img`
    height: 40vmin;
    pointer-events: none;

    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      animation: App-logo-spin infinite 20s linear;
    }
  `,
  AppLink: styled.a`
    color: #61dafb;
  `,
};

function App() {
  return (
    <Styled.App>
      <Styled.AppHeader>
        <Styled.AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Styled.AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </Styled.AppLink>
      </Styled.AppHeader>
    </Styled.App>
  );
}

export default App;
