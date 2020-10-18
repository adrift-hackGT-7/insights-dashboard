import React, { useCallback, useMemo } from "react";
import { RouteComponentProps } from "@reach/router";

import Insights, { InsightGroup } from "./Insights";
import { uiRed, uiGreen, fgSecondary } from "../theme";
import {
  InsightItemAction,
  InsightItemDefinition,
  InsightItemIcon,
} from "./InsightItem";
import { HistoricalInsightApiGroup } from "../api";
import { useStore, useDispatch } from "./Dashboard";

/**
 * Scrollable pane that handles data fetching and loading
 * for a list of historical actionable insights/results at /dashboard/historical
 */
function HistoricalInsights(_: RouteComponentProps) {
  const { historicalInsights, historicalInsightsLoading } = useStore();
  const dispatch = useDispatch();
  const groups = useMemo(() => normalizeApiGroups(historicalInsights), [
    historicalInsights,
  ]);

  return (
    <Insights
      groups={groups}
      emptyText="No historical insights found"
      loading={historicalInsightsLoading}
      onClickAction={useCallback(
        (groupId: string, itemId: string, actionId: string) =>
          dispatch({
            type: "toggleHistoricalItem",
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

export default HistoricalInsights;

// ? =================
// ? Utility functions
// ? =================

/**
 * Remakes the header of an item to match the new state
 * @param header - Original header
 */
function remakeHeader(header: string, state: "accepted" | "dismissed"): string {
  let normalized = header[0].toLowerCase() + header.slice(1);
  normalized = normalized.replace(/^dismissed\s*-\s*/, "");
  normalized = normalized.replace(/^accepted\s*-\s*/, "");
  return `${state[0].toUpperCase() + state.slice(1)} - ${normalized}`;
}

/**
 * Utility function that normalizes the API groups into the objects expected
 * @param sourceGroups - Source groups from the API
 */
function normalizeApiGroups(
  sourceGroups: HistoricalInsightApiGroup[]
): InsightGroup[] {
  const groups: InsightGroup[] = sourceGroups.map((group) => {
    const items: InsightItemDefinition[] = group.items.map((item) => {
      let icon: InsightItemIcon;
      switch (item.variant) {
        case "add":
          icon = "plus";
          break;
        case "remove":
          icon = "minus";
          break;
        case "increase":
          icon = "up";
          break;
        case "people":
          icon = "people";
          break;
      }

      let color: string;
      let header = item.header;
      let actions: InsightItemAction[];
      switch (item.state) {
        case "accepted":
          color = uiGreen;
          header = remakeHeader(header, "accepted");
          actions = makeActions(false, true);
          break;
        case "dismissed":
          color = uiRed;
          header = remakeHeader(header, "dismissed");
          actions = makeActions(true, false);
          break;
        default:
          color = fgSecondary;
          actions = makeActions(true, true);
          break;
      }

      return {
        id: item.id,
        icon,
        iconColor: color,
        header,
        headerColor: color,
        description: item.description,
        actions,
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

/**
 * Makes an action list depending on the capabilities of an item
 * @param accept - Whether the action list will have an accept action
 * @param dismiss - Whether the action list will have an dismiss action
 */
function makeActions(accept: boolean, dismiss: boolean) {
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
}
