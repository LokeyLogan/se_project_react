import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./vendor/normalize.css"; // ✅ Add this first
import "./index.css"; // Custom styles
import App from "./components/App/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
