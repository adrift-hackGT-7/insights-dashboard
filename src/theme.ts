import { css } from "@emotion/core";

export const bgPrimary = "#ffffff";
export const bgSecondary = "rgba(116, 116, 128, 0.08)";
export const bgTertiary = "rgba(120, 120, 128, 0.16)";
export const borderColor = "rgba(60, 60, 67, 0.2)";
export const fgPrimary = "#080808";
export const fgSecondary = "rgba(60, 60, 67, 1)";
export const fgTertiary = "rgba(60, 60, 67, 0.6)";
export const uiGreen = "#469F3D";
export const uiRed = "#EE586B";
export const uiOrange = "#F0681E";
export const uiTeal = "#008FB2";
export const uiBlue = "#3179DE";
export const uiBlueDark = "#2E7DF7";
export const uiBlueLight = "rgba(46, 125, 247, 0.15)";

// Contains the global CSS rules for the entire site
export const global = css`
  @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

  body {
    margin: 0;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  * {
    box-sizing: border-box;
  }
`;
