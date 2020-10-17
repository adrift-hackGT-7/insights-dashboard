import React from "react";
import { Global } from "@emotion/core";
import ReactDOM from "react-dom";

import App from "./components/App";
import { global } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={global}
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
