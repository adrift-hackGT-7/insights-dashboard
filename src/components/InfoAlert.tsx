import styled from "@emotion/styled";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { RiInformationFill } from "react-icons/ri";

const Styled = {
  InfoAlert: styled.div``,
  IconContainer: styled.div``,
  InfoIcon: styled(RiInformationFill)``,
  Content: styled.div``,
  CloseContainer: styled.div``,
  CloseButton: styled.button``,
  CloseIcon: styled(MdClose)``,
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
      <Styled.CloseContainer>
        <Styled.CloseButton onClick={() => setIsOpen(false)}>
          <Styled.CloseIcon />
        </Styled.CloseButton>
      </Styled.CloseContainer>
    </Styled.InfoAlert>
  );
}

export default InfoAlert;
