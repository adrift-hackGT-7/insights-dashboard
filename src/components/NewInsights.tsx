import React, { useCallback, useMemo } from "react";
import { RouteComponentProps } from "@reach/router";

import Insights, { InsightGroup } from "./Insights";
import { uiRed, uiGreen, uiOrange, uiTeal } from "../theme";
import { InsightItemDefinition, InsightItemIcon } from "./InsightItem";
import { InsightApiGroup } from "../api";
import { useStore, useDispatch } from "./Dashboard";

/**
 * Scrollable pane that handles data fetching and loading
 * for a list of current actionable insights at /dashboard/new
 */
function NewInsights(_: RouteComponentProps) {
  const { newInsights, newInsightsLoading } = useStore();
  const dispatch = useDispatch();
  const groups = useMemo(() => normalizeApiGroups(newInsights), [
    newInsights,
  ]);

  return (
    <Insights
      groups={groups}
      emptyText="No new insights found"
      loading={newInsightsLoading}
      onClickAction={useCallback(
        (groupId: string, itemId: string, actionId: string) =>
          dispatch({
            type: "toggleNewItem",
            payload: {
              groupId,
              itemId,
              action: actionId === "dismiss" ? "dismiss" : "accept",
            },
          }),
        [dispatch]
      )}
    />
  );
}

export default NewInsights;

// ? ================
// ? Helper functions
// ? ================

/**
 * Utility function that normalizes the API groups into the objects expected
 * @param sourceGroups - Source groups from the API
 */
function normalizeApiGroups(sourceGroups: InsightApiGroup[]): InsightGroup[] {
  const groups: InsightGroup[] = sourceGroups.map((group) => {
    const items: InsightItemDefinition[] = group.items.map((item) => {
      let icon: InsightItemIcon;
      let iconColor: string;
      switch (item.variant) {
        case "add":
          icon = "plus";
          iconColor = uiGreen;
          break;
        case "remove":
          icon = "minus";
          iconColor = uiRed;
          break;
        case "increase":
          icon = "up";
          iconColor = uiTeal;
          break;
        case "people":
          icon = "people";
          iconColor = uiOrange;
          break;
      }

      return {
        id: item.id,
        icon,
        iconColor,
        header: item.header,
        description: item.description,
        actions: [
          {
            icon: "check",
            color: uiGreen,
            id: "accept",
          },
          {
            icon: "x",
            color: uiRed,
            id: "dismiss",
          },
        ],
      };
    });

    return {
      id: group.id,
      header: group.header,
      items,
    };
  });

  return groups;
}
