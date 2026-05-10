import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Must be HashRouter
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter> 
      {/* Note: You don't need basename="/Fix-it" with HashRouter! */}
      <App />
    </HashRouter>
  </StrictMode>
);
