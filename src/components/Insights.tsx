import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import EmptyTray from "../images/empty-tray.png";
import InsightHeader from "./InsightHeader";
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
  EmptyWrapper: styled.div`
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
  EmptyText: styled.p`
    margin-top: -4px;
    margin-bottom: 0;

    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.006em;
    color: rgba(0, 0, 0, 0.8);
  `,
};

/**
 * Represents a list of groups of insights
 */
function Insights({
  groups,
  onClickAction,
  emptyText = "No insights found",
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
        <Styled.EmptyWrapper>
          <Styled.EmptyImage src={EmptyTray} />
          <Styled.EmptyText>{emptyText}</Styled.EmptyText>
        </Styled.EmptyWrapper>
      )}
    </Styled.Insights>
  );
}

export default Insights;
