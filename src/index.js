import React from "react";
import * as ReactDOM from "react-dom/client";
import RoutesHandler from "./utils/RoutesHandler";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <RoutesHandler />
  </BrowserRouter>
);
