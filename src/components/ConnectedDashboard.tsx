import styled from "@emotion/styled";
import React from "react";
import { Redirect, Router } from "@reach/router";

import CurrentInsights from "./CurrentInsights";
import HistoricalInsights from "./HistoricalInsights";
import { borderColor } from "../theme";
import { containerWidth } from "../layout";

const Styled = {
  TabWrapper: styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid ${borderColor};
  `,
  TabContent: styled.div`
    flex: 0 1 ${containerWidth};
  `,
  ScrollingContent: styled.div``,
};

/**
 * Shows the inner content/routing needed for a connected dashboard,
 * including the tabs at the top
 */
function ConnectedDashboard() {
  return (
    <>
      <Styled.TabWrapper>
        <Styled.TabContent>Connected dashboard</Styled.TabContent>
      </Styled.TabWrapper>
      <Router>
        <CurrentInsights path="/dashboard/current" />
        <HistoricalInsights path="/dashboard/historical" />
        <Redirect from="*" to="/dashboard/current" default noThrow />
      </Router>
    </>
  );
}

export default ConnectedDashboard;
