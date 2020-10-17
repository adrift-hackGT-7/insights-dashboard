import styled from "@emotion/styled";
import React from "react";

const Styled = {
  InsightHeader: styled.h2``,
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
