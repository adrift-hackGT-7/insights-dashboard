import React from "react";
import styled from "@emotion/styled";
import { uiBlue } from "../theme";

const Styled = {
  Outer: styled.div<{ width: number }>`
    width: ${(props) => props.width}px;
    height: 8px;
    border-radius: 1000rem;
    background-color: rgba(60, 60, 67, 0.13);
  `,
  Inner: styled.div<{ progress: number; animationDuration: number }>`
    height: 8px;
    border-radius: 1000rem;
    background-color: ${uiBlue};
    width: ${(props) => (props.progress) * 100}%;
    transition: width ${(props) => props.animationDuration}ms linear;
  `,
};

type ProgressBarProps = {
  progress: number;
  animationDuration: number;
  width: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Shows progress bar that displays any amount of progress
 */
function ProgressBar({
  width,
  progress,
  animationDuration,
  className,
  style,
}: ProgressBarProps) {
  return (
    <Styled.Outer width={width} style={style} className={className}>
      <Styled.Inner
        progress={progress}
        animationDuration={animationDuration}
      />
    </Styled.Outer>
  );
}

export default ProgressBar;
