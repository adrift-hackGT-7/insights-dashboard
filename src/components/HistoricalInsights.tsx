import styled from "@emotion/styled";
import React from "react";
import { RouteComponentProps } from "@reach/router";

import InsightHeader from "./InsightHeader";
import InsightItem from "./InsightItem";
import { uiRed, uiGreen, fgSecondary } from "../theme";

const Styled = {
  InsightHeader: styled(InsightHeader)`
    padding-top: 32px;
  `,
};

const mockActions = [
  {
    icon: "check" as const,
    color: uiGreen,
    onClick: () => {
      window.alert("Accepted!");
    },
  },
  {
    icon: "x" as const,
    color: uiRed,
    onClick: () => {
      window.alert("Dismissed!");
    },
  },
];

/**
 * Scrollable pane that handles data fetching and loading
 * for a list of historical actionable insights/results at /dashboard/historical
 */
function HistoricalInsights(_: RouteComponentProps) {
  // TODO implement fetching, loading, and empty
  return (
    <>
      <Styled.InsightHeader>March 2020</Styled.InsightHeader>
      <InsightItem
        icon="plus"
        iconColor={uiGreen}
        header="Accepted - add *Strawberry Mocha Latte* to your catalog for up to *34%* increased revenue"
        headerColor={uiGreen}
        description="Based on sales data in 210 other stores that stock this item in the past 2 months"
        actions={mockActions}
      />
      <InsightItem
        icon="minus"
        iconColor={uiRed}
        header="Dismissed - remove *Mocha Americano* from your catalog"
        headerColor={uiRed}
        description="Overall revenue contribution: *0.001%* (based on sales data in this store over the past year). Overall market revenue contribution: *0.00056%* (based on sales data in 21 other stores that stock this item in the past year."
        actions={mockActions}
      />
      <InsightItem
        icon="up"
        iconColor={fgSecondary}
        header="Promote *Hazelnut Espresso* for up to *70%* sales growth on that item and *12%* increased revenue"
        headerColor={fgSecondary}
        description="Based on sales data in 12 other stores that promoted this item in the past 2 months"
        actions={mockActions}
      />
      <Styled.InsightHeader>December 2019</Styled.InsightHeader>
      <InsightItem
        icon="plus"
        iconColor={uiGreen}
        header="Accepted - increase staffing on *Thursdays* and *Fridays* from *11:00 AM* to *3:00 PM* to see potential revenue increases of *28%*"
        headerColor={uiGreen}
        description={"Labor cost increase (per month): *$ 1,201.31*\nPotential revenue increase (per month): *$ 4,901.77*\nOverall potential increase in profit: *$ 3,700,46*"}
        actions={mockActions}
      />
    </>
  );
}

export default HistoricalInsights;
