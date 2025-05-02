import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./common/css/index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { connectorTheme } from "akeneo-design-system";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={connectorTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
