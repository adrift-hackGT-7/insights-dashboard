import styled from "@emotion/styled";
import React from "react";
import { Redirect, Router, Link } from "@reach/router";
import { FaLightbulb, FaHistory } from "react-icons/fa";

import NewInsights from "./NewInsights";
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
  Tab: styled(Link)``,
  InsightIcon: styled(FaLightbulb)``,
  HistoryIcon: styled(FaHistory)``,
};

/**
 * Shows the inner content/routing needed for a connected dashboard,
 * including the tabs at the top
 */
function ConnectedDashboard() {
  return (
    <>
      <Styled.TabWrapper>
        <Styled.TabContent>
          <Styled.Tab to="/dashboard/new">
            <Styled.InsightIcon /> New Insights
          </Styled.Tab>
          <Styled.Tab to="/dashboard/historical">
            <Styled.HistoryIcon /> Historical Insights
          </Styled.Tab>
        </Styled.TabContent>
      </Styled.TabWrapper>
      <Router>
        <NewInsights path="new" />
        <HistoricalInsights path="historical" />
        <Redirect from="*" to="/dashboard/new" default noThrow />
      </Router>
    </>
  );
}

export default ConnectedDashboard;
