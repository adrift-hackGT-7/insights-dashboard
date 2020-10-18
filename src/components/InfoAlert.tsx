import styled from "@emotion/styled";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";

import { uiBlue, uiBlueDark, uiBlueLight } from "../theme";

const Styled = {
  InfoAlert: styled.div`
    border: 1px solid ${uiBlueDark};
    box-sizing: border-box;
    border-radius: 8px;
    background-color: ${uiBlueLight};

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 12px;
    margin-top: 32px;
  `,
  IconContainer: styled.div`
    padding-right: 10px;
  `,
  InfoIcon: styled(RiInformationFill)`
    font-size: 20px;
    color: ${uiBlue};
  `,
  Content: styled.div`
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.006em;
    color: rgba(0, 0, 0, 0.8);
  `,
  CloseButton: styled.button`
    cursor: pointer;
    margin-top: -16px;
    margin-right: -16px;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 16px;
    opacity: 0.5;

    transition: all 0.125s linear;
    &:hover {
      opacity: 1;
    }
  `,
  CloseIcon: styled(MdClose)`
    font-size: 20px;
  `,
};

export type InfoAlertProps = {
  children: React.ReactNode;
};

/**
 * Styled informational alert that is closable
 */
function InfoAlert({ children }: InfoAlertProps) {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;

  return (
    <Styled.InfoAlert>
      <Styled.IconContainer>
        <Styled.InfoIcon />
      </Styled.IconContainer>
      <Styled.Content>{children}</Styled.Content>
      <Styled.CloseButton onClick={() => setIsOpen(false)}>
        <Styled.CloseIcon />
      </Styled.CloseButton>
    </Styled.InfoAlert>
  );
}

export default InfoAlert;
