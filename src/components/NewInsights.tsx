import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";

import Insights, { InsightGroup } from "./Insights";
import { uiRed, uiGreen, uiOrange, uiTeal } from "../theme";
import { InsightItemDefinition, InsightItemIcon } from "./InsightItem";
import { mockNewInsightsFetch, NewInsightsApiResponse } from "../api";

/**
 * Scrollable pane that handles data fetching and loading
 * for a list of current actionable insights at /dashboard/new
 */
function NewInsights(_: RouteComponentProps) {
  const [groups, setGroups] = useState<InsightGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      // Dispatch the fetch call
      mockNewInsightsFetch()
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
      emptyText="No new insights found"
      loading={loading}
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

/**
 * Performs a deep clone of the group list, removing an item (and its group if needed)
 * along the way
 * @param groups - Original groups
 * @param groupId - Group id of item to remove
 * @param itemId - Id of item to remove
 */
function removeItem(
  groups: InsightGroup[],
  groupId: string,
  itemId: string
): InsightGroup[] {
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
    });

    // Skip now-empty groups
    if (newItems.length !== 0) {
      newGroups.push({
        id: group.id,
        header: group.header,
        items: newItems,
      });
    }
  });

  return newGroups;
}

/**
 * Utility function that normalizes the API response into the object expected
 * @param response - Source response from the API
 */
function normalizeApiResponse(response: NewInsightsApiResponse): InsightGroup[] {
  const groups: InsightGroup[] = response.groups.map((group) => {
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
