import React, { useState } from "react";
import styled from "@emotion/styled";
import { Redirect, Router, RouteComponentProps } from "@reach/router";
import ReactSwitch from "react-switch";

import Header from "./Header";
import PoweredBy from "./PoweredBy";
import InfoAlert from "./InfoAlert";
import ConnectedDashboard from "./ConnectedDashboard";
import { containerWidth } from "../layout";

const Styled = {
  Container: styled.div`
    margin: 0 auto;
    max-width: ${containerWidth};
  `,
  ConnectedToggleWrapper: styled.div``,
  ConnectedToggle: styled(ReactSwitch)``,
  Footer: styled.footer``,
};

/**
 * Displays the main dashboard component at /dashboard,
 * and manages local state of being "connected" or not to the insights network
 */
function Dashboard(_: RouteComponentProps) {
  const [connected, setConnected] = useState(false);
  return (
    <>
      <Header connected={connected} />
      <Styled.Container>
        {!connected && (
          <InfoAlert>
            To gain access to the insights dashboard, you’ll need to enable
            anonymous data sharing with our national network of other small
            businesses in your same sector. This will grant you access to
            actionable metrics based on the historical and current sales,
            catalog, and staffing data of <strong>over 986</strong> other{" "}
            <strong>coffee shops</strong> across the nation.
          </InfoAlert>
        )}
        <Styled.ConnectedToggleWrapper>
          <Styled.ConnectedToggle
            checked={connected}
            onChange={() => setConnected(!connected)}
          />{" "}
          Connect to a national network of <strong>coffee shops</strong>
        </Styled.ConnectedToggleWrapper>
        {connected && <ConnectedDashboard />}
        {!connected && <PathNormalizer />}
        <Styled.Footer>
          <PoweredBy />
        </Styled.Footer>
      </Styled.Container>
    </>
  );
}

export default Dashboard;

// ? ==============
// ? Sub-components
// ? ==============

// Use to redirect to non-routed paths
const EmptyRoute = (_: RouteComponentProps) => null;

/**
 * Normalizes the path when not connected to not have any trailing components
 */
function PathNormalizer() {
  return (
    <Router>
      <EmptyRoute path="/dashboard" />
      <Redirect from="*" to="/dashboard" default noThrow />
    </Router>
  );
}
