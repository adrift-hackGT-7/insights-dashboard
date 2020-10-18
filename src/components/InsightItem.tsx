import styled from "@emotion/styled";
import React, { useMemo } from "react";
import {
  MdRemoveCircle,
  MdAddCircle,
  MdArrowDropDownCircle,
  MdAccountCircle,
} from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";

import { fgPrimary, fgSecondary } from "../theme";

export type InsightItemIcon = "plus" | "minus" | "up" | "people";

export type InsightItemAction = {
  color: string;
  icon: "check" | "x";
  id: string;
};

export type InsightItemDefinition = {
  icon: InsightItemIcon;
  id: string;
  iconColor?: string;
  header: string;
  headerColor?: string;
  description: string;
  actions?: InsightItemAction[];
};

export type InsightItemProps = InsightItemDefinition & {
  onClickAction: (id: string) => void;
};

// Extract to use in selectors
const ActionContainer = styled.div`
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;

  background-image: linear-gradient(to right, transparent 0%, white 25%);
  padding: 12px;
  padding-left: 48px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  // Start out as hidden
  transition: all 0.125s linear;
  pointer-events: none;
  opacity: 0;
`;

const Styled = {
  ActionContainer,
  Wrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 12px;
    position: relative;

    &:hover {
      ${ActionContainer} {
        pointer-events: initial;
        opacity: 1;
      }
    }
  `,
  IconContainer: styled.div`
    padding-right: 12px;
    font-size: 48px;
    line-height: 0;
  `,
  Content: styled.div`
    padding-bottom: 6px;
  `,
  Header: styled.h4`
    margin-top: 6px;
    margin-bottom: 0;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;

    letter-spacing: -0.006em;
    color: ${fgPrimary};
  `,
  Description: styled.p`
    margin-top: 8px;
    margin-bottom: 0;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;

    letter-spacing: 0.004em;
    color: rgba(60, 60, 67, 0.65);
  `,
  ActionButton: styled.button<{ color: string }>`
    outline: none;
    --color: ${(props) => props.color};
    border: 2px dashed var(--color);
    color: var(--color);
    padding: 9px 9px 3px;
    border-radius: 8px;
    background-color: transparent;
    cursor: pointer;
    margin-left: 12px;

    font-size: 20px;
    transition: all 0.125s linear;

    &:hover {
      background-color: var(--color);
      color: white !important;
    }
  `,
};

/**
 * Individual header for a scrollable list of insights
 */
function InsightItem({
  icon,
  iconColor = fgSecondary,
  header,
  headerColor = fgPrimary,
  description,
  actions = [],
  onClickAction,
}: InsightItemProps) {
  const IconComponent = {
    plus: MdAddCircle,
    minus: MdRemoveCircle,
    people: MdAccountCircle,
    up: ArrowUpIcon,
  }[icon];

  const transformedHeader = useMemo(() => transformText(header), [header]);
  const transformedDescription = useMemo(() => transformText(description), [
    description,
  ]);

  return (
    <Styled.Wrapper>
      <Styled.IconContainer>
        <IconComponent style={{ color: iconColor }} />
      </Styled.IconContainer>
      <Styled.Content>
        <Styled.Header
          style={{ color: headerColor }}
          dangerouslySetInnerHTML={{ __html: transformedHeader }}
        />
        <Styled.Description
          dangerouslySetInnerHTML={{ __html: transformedDescription }}
        />
      </Styled.Content>
      <Styled.ActionContainer>
        {actions.map((action) => (
          <Action
            key={action.id}
            onClick={() => onClickAction(action.id)}
            {...action}
          />
        ))}
      </Styled.ActionContainer>
    </Styled.Wrapper>
  );
}

export default InsightItem;

// ? =================
// ? Utility functions
// ? =================

/**
 * Transforms source text to turn stars into bolded text,
 * and newlines into line breaks
 * @param source - Source original text
 */
function transformText(source: string): string {
  return source
    .replace(/\*([^*]+)\*/g, (_, group) => `<strong>${group}</strong>`)
    .replace(/\n/g, "<br>");
}

// ? ==============
// ? Sub components
// ? ==============

/**
 * Utility up arrow that rotates the down arrow icon
 */
function ArrowUpIcon({
  style = {},
  ...rest
}: React.ComponentProps<typeof MdArrowDropDownCircle>) {
  return (
    <MdArrowDropDownCircle
      {...rest}
      style={{ ...style, transform: "rotate(180deg)" } as React.CSSProperties}
    />
  );
}

type ActionProps = InsightItemAction & { onClick: () => void };

/**
 * Single action button that appears on each item
 */
function Action({ color, icon, onClick }: ActionProps) {
  const IconComponent = {
    check: FaCheck,
    x: FaTimes,
  }[icon];

  return (
    <Styled.ActionButton onClick={onClick} color={color}>
      <IconComponent />
    </Styled.ActionButton>
  );
}
