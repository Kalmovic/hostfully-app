import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./providers/theme.ts";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Theme>
  </React.StrictMode>
);
