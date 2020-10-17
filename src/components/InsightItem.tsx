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
  onClick: () => void;
};

export type InsightItemProps = {
  icon: InsightItemIcon;
  iconColor?: string;
  header: string;
  headerColor?: string;
  description: string;
  actions?: InsightItemAction[];
};

const Styled = {
  Wrapper: styled.div``,
  IconContainer: styled.div``,
  Content: styled.div``,
  Header: styled.h4``,
  Description: styled.p``,
  ActionContainer: styled.div``,
  ActionButton: styled.button<{ color: string }>``,
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
        {actions.map((action, i) => (
          <Action key={i} {...action} />
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
      style={{ ...rest, transform: "rotate(180deg)" } as React.CSSProperties}
    />
  );
}

/**
 * Single action button that appears on each item
 */
function Action({ color, icon, onClick }: InsightItemAction) {
  const IconComponent = {
    check: FaCheck,
    x: FaTimes,
  }[icon];

  return (
    <Styled.ActionButton onClick={onClick} color={color}>
      <IconComponent style={{ color }} />
    </Styled.ActionButton>
  );
}
