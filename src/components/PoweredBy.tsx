import styled from "@emotion/styled";
import React from "react";

import NcrLogo from "../images/ncr-logo.png";

const Styled = {
  Wrapper: styled.span`
    color: rgba(0, 0, 0, 0.6);
  `,
  NcrLogo: styled.img`
    opacity: 0.8;
    width: auto;
    height: 24px;
    vertical-align: -6px;
    display: inline-block;
    margin-left: 4px;
  `,
};

/**
 * Utility component that shows "Powered by <NCR logo>"
 * for use in the dashboard footers/login page
 */
function PoweredBy() {
  return (
    <Styled.Wrapper>
      Powered by <Styled.NcrLogo src={NcrLogo} />
    </Styled.Wrapper>
  );
}

export default PoweredBy;
