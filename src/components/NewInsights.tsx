import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";

import Insights, { InsightGroup } from "./Insights";
import { uiRed, uiGreen, uiOrange, uiTeal } from "../theme";
import { InsightItemAction, InsightItemDefinition } from "./InsightItem";

const mockActions: InsightItemAction[] = [
  {
    icon: "check" as const,
    color: uiGreen,
    id: "accept",
  },
  {
    icon: "x" as const,
    color: uiRed,
    id: "dismiss",
  },
];

const initialGroups: InsightGroup[] = [
  {
    header: "Catalog",
    id: "catalog",
    items: [
      {
        icon: "plus",
        id: "add-strawberry-mocha-latte",
        iconColor: uiGreen,
        header:
          "Add *Strawberry Mocha Latte* to your catalog for up to *34%* increased revenue",
        description:
          "Based on sales data in 210 other stores that stock this item in the past 2 months",
        actions: mockActions,
      },
      {
        icon: "minus",
        id: "remove-mocha-americano",
        iconColor: uiRed,
        header: "Remove *Mocha Americano* from your catalog",
        description:
          "Overall revenue contribution: *0.001%* (based on sales data in this store over the past year). Overall market revenue contribution: *0.00056%* (based on sales data in 21 other stores that stock this item in the past year.",
        actions: mockActions,
      },
    ],
  },
  {
    header: "Promotions",
    id: "promotions",
    items: [
      {
        icon: "up",
        id: "hazelnut-espresso",
        iconColor: uiTeal,
        header:
          "Promote *Hazelnut Espresso* for up to *70%* sales growth on that item and *12%* increased revenue",
        description:
          "Based on sales data in 12 other stores that promoted this item in the past 2 months",
        actions: mockActions,
      },
    ],
  },
  {
    header: "Staffing",
    id: "staffing",
    items: [
      {
        icon: "people",
        id: "increase-staffing-thursday-fridays",
        iconColor: uiOrange,
        header:
          "Increase staffing on *Thursdays* and *Fridays* from *11:00 AM* to *3:00 PM* to see potential revenue increases of *28%*",
        description:
          "Labor cost increase (per month): *$ 1,201.31*\nPotential revenue increase (per month): *$ 4,901.77*\nOverall potential increase in profit: *$ 3,700,46*",
        actions: mockActions,
      },
    ],
  },
];

/**
 * Scrollable pane that handles data fetching and loading
 * for a list of current actionable insights at /dashboard/new
 */
function NewInsights(_: RouteComponentProps) {
  const [groups, setGroups] = useState(initialGroups);
  return (
    <Insights
      groups={groups}
      onClickAction={(groupId: string, itemId: string, _actionId: string) => {
        // TODO add to historical items based on approval/dismissal
        setGroups(removeItem(groups, groupId, itemId));
      }}
    />
  );
}

export default NewInsights;

// ? ================
// ? Helper functions
// ? ================

function removeItem(groups: InsightGroup[], groupId: string, itemId: string): InsightGroup[] {
  const newGroups: InsightGroup[] = [];
  groups.forEach((group) => {
    if (groupId !== group.id) {
      newGroups.push(group);
      return;
    }

    const newItems: InsightItemDefinition[] = [];
    group.items.forEach((item) => {
      if (itemId !== item.id) {
        newItems.push(item);
        return;
      }
    })

    // Skip now-empty groups
    if (newItems.length !== 0) {
      newGroups.push({
        id: group.id,
        header: group.header,
        items: newItems,
      })
    }
  });

  return newGroups;
}
