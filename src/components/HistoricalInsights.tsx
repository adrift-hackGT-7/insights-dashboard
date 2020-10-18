import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";

import Insights, { InsightGroup } from "./Insights";
import { uiRed, uiGreen, fgSecondary } from "../theme";
import {
  InsightItemAction,
  InsightItemDefinition,
  InsightItemIcon,
} from "./InsightItem";
import {
  HistoricalNewInsightsApiResponse,
  mockHistoricalInsightsFetch,
} from "../api";

/**
 * Scrollable pane that handles data fetching and loading
 * for a list of historical actionable insights/results at /dashboard/historical
 */
function HistoricalInsights(_: RouteComponentProps) {
  const [groups, setGroups] = useState<InsightGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      // Dispatch the fetch call
      mockHistoricalInsightsFetch()
        .then((response) => {
          setLoading(false);
          setGroups(normalizeApiResponse(response));
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <Insights
      groups={groups}
      emptyText="No historical insights found"
      loading={loading}
      onClickAction={(groupId: string, itemId: string, actionId: string) => {
        setGroups(toggleItem(groups, groupId, itemId, actionId));
      }}
    />
  );
}

export default HistoricalInsights;

// ? =================
// ? Utility functions
// ? =================

/**
 * Performs a deep clone of the group list, toggling an item on its way down
 * @param groups - Original groups
 * @param groupId - Group id of item to toggle
 * @param itemId - Id of item to toggle
 * @param actionId - Original action that caused the toggle
 */
function toggleItem(
  groups: InsightGroup[],
  groupId: string,
  itemId: string,
  actionId: string
): InsightGroup[] {
  const newGroups: InsightGroup[] = [];
  groups.forEach((group) => {
    const newItems: InsightItemDefinition[] = [];
    group.items.forEach((item) => {
      if (groupId === group.id && itemId === item.id) {
        // Re-form item based on action
        if (actionId === "accept") {
          newItems.push({
            ...item,
            header: remakeHeader(item.header, "accepted"),
            iconColor: uiGreen,
            headerColor: uiGreen,
            actions: makeActions(false, true),
          });
        } else if (actionId === "dismiss") {
          newItems.push({
            ...item,
            header: remakeHeader(item.header, "dismissed"),
            iconColor: uiRed,
            headerColor: uiRed,
            actions: makeActions(true, false),
          });
        }
      } else {
        newItems.push(item);
      }
    });
    newGroups.push({
      id: group.id,
      header: group.header,
      items: newItems,
    });
  });

  return newGroups;
}

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
 * Utility function that normalizes the API response into the object expected
 * @param response - Source response from the API
 */
function normalizeApiResponse(
  response: HistoricalNewInsightsApiResponse
): InsightGroup[] {
  const groups: InsightGroup[] = response.groups.map((group) => {
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
};
