import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";

import "./style/main.scss";


createRoot(document.querySelector(".app-wrapper")).render(
  <StrictMode>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </StrictMode>,
)
