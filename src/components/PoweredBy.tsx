import styled from "@emotion/styled";
import React from "react";

import NcrLogo from "../images/ncr-logo.png";

const Styled = {
  Wrapper: styled.span``,
  NcrLogo: styled.img``,
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
