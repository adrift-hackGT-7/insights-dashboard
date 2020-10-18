import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useNProgress } from "@tanem/react-nprogress";

import EmptyTray from "../images/empty-tray.png";
import InsightHeader from "./InsightHeader";
import ProgressBar from "./ProgressBar";
import InsightItem, { InsightItemDefinition } from "./InsightItem";

export type InsightGroup = {
  header: string;
  id: string;
  items: InsightItemDefinition[];
};

export type InsightsProps = {
  groups: InsightGroup[];
  onClickAction: (groupId: string, itemId: string, actionId: string) => void;
  emptyText?: string;
  loading?: boolean;
};

type InsightGroupOrItem = Group | Item;
type Group = { type: "group" } & InsightGroup;
type Item = {
  type: "item";
  groupId: string;
  originalId: string;
} & InsightItemDefinition;

const transitionClass = "insights-transition";

console.log(String(transitionClass));

const Styled = {
  TransitionGroup: styled(TransitionGroup)`
    .${transitionClass}-enter {
      opacity: 0.01;
      transform: translate(-100px, 0);
    }

    .${transitionClass}-enter-active {
      opacity: 1;
      transform: translate(0, 0);
      transition: all 200ms ease-in;
    }

    .${transitionClass}-exit {
      opacity: 1;
      transform: translate(0, 0);
    }

    .${transitionClass}-exit-active {
      opacity: 0.01;
      transform: translate(100px, 0);
      transition: all 200ms ease-in;
    }
  `,
  InsightHeader: styled(InsightHeader)`
    padding-top: 32px;
  `,
  Insights: styled.div`
    position: relative;
  `,
  PlaceholderWrapper: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  EmptyImage: styled.img`
    width: 92px;
    height: auto;
    opacity: 0.175;

    margin-bottom: 0;
    margin-top: 0;
  `,
  PlaceholderText: styled.p`
    margin-top: -4px;
    margin-bottom: 0;

    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.006em;
    color: rgba(0, 0, 0, 0.8);
  `,
  ProgressBar: styled(ProgressBar)`
    margin-bottom: 24px;
  `,
};

/**
 * Represents a list of groups of insights
 */
function Insights({
  groups,
  onClickAction,
  emptyText = "No insights found",
  loading = false,
}: InsightsProps) {
  // TODO implement fetching, loading, and empty

  // Calculate a flattened map of all groups
  const flattened = useMemo(() => {
    const items: InsightGroupOrItem[] = [];
    groups.forEach((group) => {
      items.push({ type: "group", ...group });
      group.items.forEach((item) =>
        items.push({
          type: "item",
          ...item,
          id: `${group.id}__${item.id}`,
          groupId: group.id,
          originalId: item.id,
        })
      );
    });
    return items;
  }, [groups]);

  if (loading) {
    return (
      <Styled.Insights>
        <Styled.PlaceholderWrapper>
          <Loading />
        </Styled.PlaceholderWrapper>
      </Styled.Insights>
    );
  }

  // Use a transition group
  return (
    <Styled.Insights>
      <Styled.TransitionGroup>
        {flattened.map((item) => (
          <CSSTransition
            key={item.id}
            timeout={200}
            classNames={String(transitionClass)}
          >
            {item.type === "group" ? (
              <Styled.InsightHeader>{item.header}</Styled.InsightHeader>
            ) : (
              <InsightItem
                {...item}
                onClickAction={(actionId: string) =>
                  onClickAction(item.groupId, item.originalId, actionId)
                }
              />
            )}
          </CSSTransition>
        ))}
      </Styled.TransitionGroup>
      {flattened.length === 0 && (
        <Styled.PlaceholderWrapper>
          <Styled.EmptyImage src={EmptyTray} />
          <Styled.PlaceholderText>{emptyText}</Styled.PlaceholderText>
        </Styled.PlaceholderWrapper>
      )}
    </Styled.Insights>
  );
}

export default Insights;

// ? ==============
// ? Sub-components
// ? ==============

function Loading() {
  const { animationDuration, progress } = useNProgress({
    isAnimating: true,
    incrementDuration: 200,
    minimum: 0.20,
  });

  return (
    <>
      <Styled.ProgressBar
        width={240}
        progress={progress}
        animationDuration={animationDuration}
      />
      <Styled.PlaceholderText>Loading insights...</Styled.PlaceholderText>
    </>
  );
}
