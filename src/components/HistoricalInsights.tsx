import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";

import Insights, { InsightGroup } from "./Insights";
import { uiRed, uiGreen, fgSecondary } from "../theme";
import { InsightItemAction, InsightItemDefinition } from "./InsightItem";
import { textSpanIsEmpty } from "typescript";

const mockActions = (accept: boolean, dismiss: boolean) => {
  const actions: InsightItemAction[] = [];
  if (accept) {
    actions.push({
      icon: "check" as const,
      color: uiGreen,
      id: "accept",
    });
  }
  if (dismiss) {
    actions.push({
      icon: "x" as const,
      color: uiRed,
      id: "dismiss",
    });
  }

  return actions;
};

const initialGroups: InsightGroup[] = [
  {
    header: "March 2020",
    id: "march-2020",
    items: [
      {
        icon: "plus",
        id: "add-strawberry-mocha-latte",
        iconColor: uiGreen,
        header:
          "Accepted - add *Strawberry Mocha Latte* to your catalog for up to *34%* increased revenue",
        headerColor: uiGreen,
        description:
          "Based on sales data in 210 other stores that stock this item in the past 2 months",
        actions: mockActions(false, true),
      },
      {
        icon: "minus",
        id: "remove-mocha-americano",
        iconColor: uiRed,
        header: "Dismissed - remove *Mocha Americano* from your catalog",
        headerColor: uiRed,
        description:
          "Overall revenue contribution: *0.001%* (based on sales data in this store over the past year). Overall market revenue contribution: *0.00056%* (based on sales data in 21 other stores that stock this item in the past year.",
        actions: mockActions(true, false),
      },
      {
        icon: "up",
        id: "hazelnut-espresso",
        iconColor: fgSecondary,
        header:
          "Promote *Hazelnut Espresso* for up to *70%* sales growth on that item and *12%* increased revenue",
        headerColor: fgSecondary,
        description:
          "Based on sales data in 12 other stores that promoted this item in the past 2 months",
        actions: mockActions(true, true),
      },
    ],
  },
  {
    header: "December 2019",
    id: "december-2019",
    items: [
      {
        icon: "people",
        id: "increase-staffing-thursday-fridays",
        iconColor: uiGreen,
        header:
          "Accepted - increase staffing on *Thursdays* and *Fridays* from *11:00 AM* to *3:00 PM* to see potential revenue increases of *28%*",
        headerColor: uiGreen,
        description:
          "Labor cost increase (per month): *$ 1,201.31*\nPotential revenue increase (per month): *$ 4,901.77*\nOverall potential increase in profit: *$ 3,700,46*",
        actions: mockActions(false, true),
      },
    ],
  },
];

/**
 * Scrollable pane that handles data fetching and loading
 * for a list of historical actionable insights/results at /dashboard/historical
 */
function HistoricalInsights(_: RouteComponentProps) {
  const [groups, setGroups] = useState(initialGroups);
  return (
    <Insights
      groups={groups}
      emptyText="No historical insights found"
      onClickAction={(groupId: string, itemId: string, actionId: string) => {
        const newGroups: InsightGroup[] = [];
        groups.forEach((group) => {
          const newItems: InsightItemDefinition[] = [];
          group.items.forEach((item) => {
            if (groupId === group.id && itemId === item.id) {
              // Re-form item based on action
              if (actionId === "accept") {
                newItems.push({
                  ...item,
                  header: remakeHeader(item, "accepted"),
                  iconColor: uiGreen,
                  headerColor: uiGreen,
                  actions: mockActions(false, true),
                });
              } else if (actionId === "dismiss") {
                newItems.push({
                  ...item,
                  header: remakeHeader(item, "dismissed"),
                  iconColor: uiRed,
                  headerColor: uiRed,
                  actions: mockActions(true, false),
                });
              }
            } else {
              newItems.push(item);
            }
          })
          newGroups.push({
            id: group.id,
            header: group.header,
            items: newItems,
          });
        });
        setGroups(newGroups);
      }}
    />
  );
}

export default HistoricalInsights;

// ? =================
// ? Utility functions
// ? =================

/**
 * Remakes the header of an item to match the new state
 * @param item - Original item
 */
function remakeHeader(item: InsightItemDefinition, state: "accepted" | "dismissed"): string {
  let normalized = item.header[0].toLowerCase() + item.header.slice(1);
  if (item.iconColor === uiGreen) {
    // Assume accepted
    normalized = item.header.replace(/^Accepted\s*-\s*/, '');
  } else if (item.iconColor === uiRed) {
    // Assume dismissed
    normalized = item.header.replace(/^Dismissed\s*-\s*/, '');
  }

  return `${state[0].toUpperCase() + state.slice(1)} - ${normalized}`;
}
