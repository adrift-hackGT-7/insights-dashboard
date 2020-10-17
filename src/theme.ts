import { css } from "@emotion/core";

export const bgMain = "#ffffff";
export const bgSecondary = "#eeeeee";
export const borderColor = "rgba(60, 60, 67, 0.2)";
export const fgPrimary = "#080808";
export const fgSecondary = "rgba(60, 60, 67, 1)";
export const fgTertiary = "rgba(60, 60, 67, 0.6)";
export const uiGreen = "#469F3D";
export const uiRed = "#EE586B";
export const uiOrange = "#F0681E";
export const uiTeal = "#008FB2";

// Contains the global CSS rules for the entire site
export const global = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
