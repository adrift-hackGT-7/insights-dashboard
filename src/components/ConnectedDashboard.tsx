import styled from "@emotion/styled";
import React from "react";
import { Redirect, Router, Link } from "@reach/router";
import { FaLightbulb, FaHistory } from "react-icons/fa";

import NewInsights from "./NewInsights";
import HistoricalInsights from "./HistoricalInsights";
import { borderColor, uiBlue, fgSecondary } from "../theme";
import { containerWidth } from "../layout";

const Styled = {
  TabWrapper: styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid ${borderColor};
    margin-top: 32px;
  `,
  Content: styled.div`
    overflow-y: auto;
    flex-grow: 1;
  `,
  Router: styled(Router)`
    margin: 0 auto;
    max-width: ${containerWidth};
    width: 100%;
  `,
  TabContent: styled.div`
    flex: 0 1 ${containerWidth};
  `,
  Tab: styled(Link)`
    display: inline-block;
    padding: 10px 28px 16px;
    text-decoration: none;
    --color: ${fgSecondary};
    color: var(--color);
    transform: translateY(1px);
    transition: all 0.125s linear;
    border-bottom: 3px solid transparent;

    svg {
      color: var(--color);
      opacity: 0.7;
      margin-right: 8px;
      vertical-align: -3px;
      font-size: 18px;
    }

    &[data-active] {
      --color: ${uiBlue};
      border-bottom: 3px solid ${uiBlue};
    }
  `,
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
          <Tab path="/dashboard/new" icon={FaLightbulb}>
            New Insights
          </Tab>
          <Tab path="/dashboard/historical" icon={FaHistory}>
            Historical Insights
          </Tab>
        </Styled.TabContent>
      </Styled.TabWrapper>
      <Styled.Content>
        <Styled.Router>
          <NewInsights path="new" />
          <HistoricalInsights path="historical" />
          <Redirect from="*" to="/dashboard/new" default noThrow />
        </Styled.Router>
      </Styled.Content>
    </>
  );
}

export default ConnectedDashboard;

// ? ==============
// ? Sub components
// ? ==============

type TabProps = {
  path: string;
  children: React.ReactNode;
  icon: React.ComponentType;
};

/**
 * Renders a styled Tab component that has special active styling
 */
function Tab({ path, children, icon: Icon }: TabProps) {
  return (
    <Styled.Tab
      to={path}
      getProps={({ isCurrent }) => ({
        "data-active": isCurrent ? "true" : undefined,
      })}
    >
      <Icon />
      {children}
    </Styled.Tab>
  );
}
