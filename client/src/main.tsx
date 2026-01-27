import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Define global variables for applying Apple-like styles
document.documentElement.style.setProperty('--font-sans', "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Inter', sans-serif");
document.documentElement.style.setProperty('--font-display', "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif");

createRoot(document.getElementById("root")!).render(<App />);
