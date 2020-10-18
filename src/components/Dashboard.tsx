import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { Redirect, Router, RouteComponentProps } from "@reach/router";
import ReactSwitch from "react-switch";

import Header from "./Header";
import PoweredBy from "./PoweredBy";
import InfoAlert from "./InfoAlert";
import ConnectedDashboard from "./ConnectedDashboard";
import { containerWidth } from "../layout";
import { uiBlueDark } from "../theme";
import { useLocalStorage } from "../hooks";
import {
  HistoricalInsightApiGroup,
  HistoricalInsightApiItem,
  HistoricalInsightsApiResponse,
  InsightApiGroup,
  InsightApiItem,
  mockHistoricalInsightsFetch,
  mockNewInsightsFetch,
} from "../api";

const Styled = {
  Container: styled.div`
    margin: 0 auto;
    max-width: ${containerWidth};
    width: 100%;
  `,
  ConnectedToggleWrapper: styled.div`
    margin-top: 32px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  `,
  ConnectedToggle: styled(ReactSwitch)`
    margin-right: 16px;
  `,
  ConnectedToggleLabel: styled.span`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.006em;
    color: rgba(0, 0, 0, 0.8);
  `,
  Footer: styled.footer`
    margin: 0 auto;
    justify-self: flex-end;
    margin-top: auto;
    padding: 24px 12px;
  `,
};

export type Store = {
  newInsights: InsightApiGroup[];
  newInsightsLoading: boolean;
  historicalInsights: HistoricalInsightApiGroup[];
  historicalInsightsLoading: boolean;
};

export type Action = ToggleHistoricalItemAction | ToggleNewItemAction;

export type ToggleActionType = "dismiss" | "accept";

export type ToggleHistoricalItemAction = {
  type: "toggleHistoricalItem";
  payload: {
    groupId: string;
    itemId: string;
    action: ToggleActionType;
  };
};

export type ToggleNewItemAction = {
  type: "toggleNewItem";
  payload: {
    groupId: string;
    itemId: string;
    action: ToggleActionType;
  };
};

export type Dispatch = (action: Action) => void;

export const StoreContext = React.createContext<Store>(initialStore());

export const DispatchContext = React.createContext<Dispatch>(() => {});

export const useStore = (): Store => useContext(StoreContext);

export const useDispatch = (): Dispatch => useContext(DispatchContext);

/**
 * Displays the main dashboard component at /dashboard,
 * and manages local state of being "connected" or not to the insights network
 */
function Dashboard(_: RouteComponentProps) {
  const [connected, setConnected] = useLocalStorage("isConnected", false);
  const [historicalInsights, setHistoricalInsights] = useLocalStorage<
    HistoricalInsightApiGroup[]
  >("historicalInsights", []);
  const [store, setStore] = useState(initialStore());

  // Attach references to both states
  const storeRef = useRef(store);
  storeRef.current = store;
  const historicalInsightsRef = useRef(historicalInsights);
  historicalInsightsRef.current = historicalInsights;
  const setHistoricalInsightsRef = useRef(setHistoricalInsights);
  setHistoricalInsightsRef.current = setHistoricalInsights;

  // Handle main state changes
  useEffect(() => {
    if (!connected) {
      // Clear the context store and the local storage
      setStore(initialStore());
      setHistoricalInsightsRef.current([]);
    } else {
      // Begin loading the context store
      Promise.all([mockHistoricalInsightsFetch(), mockNewInsightsFetch()])
        .then(([historicalResponseUntyped, newResponse]) => {
          let historicalResponse = (historicalResponseUntyped as unknown) as HistoricalInsightsApiResponse;
          const newHistoricalInsights = foldHistoricalInsights(
            historicalInsightsRef.current,
            historicalResponse.groups
          );

          setStore({
            newInsights: newResponse.groups,
            newInsightsLoading: false,
            historicalInsights: newHistoricalInsights,
            historicalInsightsLoading: false,
          });
          setHistoricalInsightsRef.current(newHistoricalInsights);
        })
        .catch((e) => {
          console.error(e);
          setStore({
            ...storeRef.current,
            newInsightsLoading: false,
            historicalInsightsLoading: false,
          });
        });
    }
  }, [connected, storeRef, setHistoricalInsightsRef]);

  // Create stable dispatch function
  const dispatch = useCallback<Dispatch>(
    (action) => {
      if (action.type === "toggleNewItem") {
        const { groupId, itemId, action: actionType } = action.payload;

        const [item, next] = removeNewItem(
          storeRef.current.newInsights,
          groupId,
          itemId
        );

        // Create a fake merge
        const state = actionType === "accept" ? "accepted" : "dismissed";
        const header = generateDateHeader();
        const id = header.replace(/\s+/g, "-").toLowerCase();
        const nextHistoricalInsights = foldHistoricalInsights(
          [{ header, id, items: [{ ...item, state }] }],
          storeRef.current.historicalInsights
        );

        setStore({
          ...storeRef.current,
          newInsights: next,
          historicalInsights: nextHistoricalInsights,
        });
        setHistoricalInsightsRef.current(nextHistoricalInsights);
      } else if (action.type === "toggleHistoricalItem") {
        const { groupId, itemId, action: actionType } = action.payload;
        const nextHistoricalInsights = toggleHistorical(
          storeRef.current.historicalInsights,
          groupId,
          itemId,
          actionType
        );
        setStore({
          ...storeRef.current,
          historicalInsights: nextHistoricalInsights,
        });
        setHistoricalInsightsRef.current(nextHistoricalInsights);
      }
    },
    [storeRef, setHistoricalInsightsRef]
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={store}>
        <Header connected={connected} />
        <Styled.Container>
          {!connected && (
            <InfoAlert>
              To gain access to the insights dashboard, you’ll need to enable
              anonymous data sharing with our national network of other small
              businesses in your same sector. This will grant you access to
              actionable metrics based on the historical and current sales,
              catalog, and staffing data of <strong>over 986</strong> other{" "}
              <strong>coffee shops</strong> across the nation.
            </InfoAlert>
          )}
          <Styled.ConnectedToggleWrapper>
            <Styled.ConnectedToggle
              checked={connected}
              onChange={() => setConnected(!connected)}
              offColor="#DBDBDB"
              onColor={uiBlueDark}
              offHandleColor="#fff"
              onHandleColor="#fff"
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 2px 15px rgba(0, 0, 0, 0.2)"
              activeBoxShadow="0px 2px 24px rgba(0, 0, 0, 0.3)"
              handleDiameter={28}
              height={32}
            />
            <Styled.ConnectedToggleLabel>
              Connect to a national network of <strong>coffee shops</strong>
            </Styled.ConnectedToggleLabel>
          </Styled.ConnectedToggleWrapper>
        </Styled.Container>
        {connected && <ConnectedDashboard />}
        {!connected && <PathNormalizer />}
        <Styled.Footer>
          <PoweredBy />
        </Styled.Footer>
      </StoreContext.Provider>
    </DispatchContext.Provider>
  );
}

export default Dashboard;

// ? =================
// ? Utility functions
// ? =================

function initialStore(): Store {
  return {
    newInsights: [],
    newInsightsLoading: true,
    historicalInsights: [],
    historicalInsightsLoading: true,
  };
}

/**
 * Merges two insight group lists together
 * @param current - Left side (priority)
 * @param incoming - Right side
 */
function foldHistoricalInsights(
  current: HistoricalInsightApiGroup[],
  incoming: HistoricalInsightApiGroup[]
): HistoricalInsightApiGroup[] {
  const incomingGroupMap: Record<string, HistoricalInsightApiGroup> = {};
  incoming.forEach((group) => {
    incomingGroupMap[group.id] = group;
  });

  const partialMerged = current.map((currentGroup) => {
    if (currentGroup.id in incomingGroupMap) {
      // Merge into
      const incomingGroup = incomingGroupMap[currentGroup.id];
      const newGroup = {
        ...incomingGroup,
        ...currentGroup,
        items: foldHistoricalItems(currentGroup.items, incomingGroup.items),
      };
      delete incomingGroupMap[currentGroup.id];
      return newGroup;
    }

    return currentGroup;
  });

  // Merge remaining
  const newGroups = incoming.filter((group) => group.id in incomingGroupMap);
  if (newGroups.length > 0) {
    return [...partialMerged, ...newGroups];
  }

  return partialMerged;
}

/**
 * Merges two insight item lists together
 * @param current - Left side (priority)
 * @param incoming - Right side
 */
function foldHistoricalItems(
  current: HistoricalInsightApiItem[],
  incoming: HistoricalInsightApiItem[]
) {
  const incomingItemMap: Record<string, HistoricalInsightApiItem> = {};
  incoming.forEach((item) => {
    incomingItemMap[item.id] = item;
  });

  const partialMerged = current.map((currentItem) => {
    if (currentItem.id in incomingItemMap) {
      // Merge into
      const newItem = {
        ...incomingItemMap[currentItem.id],
        ...currentItem,
      };
      delete incomingItemMap[currentItem.id];
      return newItem;
    }

    return currentItem;
  });

  // Merge remaining
  const newItems = incoming.filter((item) => item.id in incomingItemMap);
  if (newItems.length > 0) {
    return [...newItems, ...partialMerged];
  }

  return partialMerged;
}

/**
 * Performs a deep clone of the group list, removing an item (and its group if needed)
 * along the way
 * @param groups - Original groups
 * @param groupId - Group id of item to remove
 * @param itemId - Id of item to remove
 */
function removeNewItem(
  current: InsightApiGroup[],
  groupId: string,
  itemId: string
): [InsightApiItem, InsightApiGroup[]] {
  const newGroups: InsightApiGroup[] = [];
  let newItem: InsightApiItem = {
    id: "invalid",
    header: "Invalid",
    description: "An error occurred",
    variant: "remove",
  };

  current.forEach((group) => {
    if (groupId !== group.id) {
      newGroups.push(group);
      return;
    }

    const newItems: InsightApiItem[] = [];
    group.items.forEach((item) => {
      if (itemId !== item.id) {
        newItems.push(item);
      } else {
        newItem = item;
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

  return [newItem, newGroups];
}

/**
 * Performs a deep clone of the group list, toggling an item on its way down
 * @param groups - Original groups
 * @param groupId - Group id of item to toggle
 * @param itemId - Id of item to toggle
 * @param actionType - Type of toggle
 */
function toggleHistorical(
  groups: HistoricalInsightApiGroup[],
  groupId: string,
  itemId: string,
  actionType: ToggleActionType
): HistoricalInsightApiGroup[] {
  const newGroups: HistoricalInsightApiGroup[] = [];
  groups.forEach((group) => {
    const newItems: HistoricalInsightApiItem[] = [];
    group.items.forEach((item) => {
      if (groupId === group.id && itemId === item.id) {
        // Re-form item based on action
        if (actionType === "accept") {
          newItems.push({
            ...item,
            state: "accepted",
          });
        } else if (actionType === "dismiss") {
          newItems.push({
            ...item,
            state: "dismissed",
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
 * Generates the date header used for new historical insights
 */
function generateDateHeader(): string {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  return `${month} ${year}`;
}

// ? ==============
// ? Sub-components
// ? ==============

// Use to redirect to non-routed paths
const EmptyRoute = (_: RouteComponentProps) => null;

/**
 * Normalizes the path when not connected to not have any trailing components
 */
function PathNormalizer() {
  return (
    <Router>
      <EmptyRoute path="/dashboard" />
      <Redirect from="*" to="/dashboard" default noThrow />
    </Router>
  );
}
