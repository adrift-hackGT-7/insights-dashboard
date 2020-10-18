import styled from "@emotion/styled";
import React from "react";

import { borderColor } from "../theme";

const Styled = {
  InsightHeader: styled.h2`
    margin: 0;
    padding-bottom: 4px;
    border-bottom: 1px solid ${borderColor};

    font-style: normal;
    font-weight: normal;
    font-size: 23px;
    line-height: 32px;

    display: flex;
    align-items: center;
    letter-spacing: -0.028em;
  `,
};

export type InsightHeaderProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Individual header for a scrollable list of insights
 */
function InsightHeader({ children, className, style }: InsightHeaderProps) {
  return (
    <Styled.InsightHeader className={className} style={style}>
      {children}
    </Styled.InsightHeader>
  );
}

export default InsightHeader;
