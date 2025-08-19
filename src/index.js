import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import "./styles/global.css";
import log from "loglevel";

if (process.env.NODE_ENV === "development") log.setLevel("debug");
else if (process.env.NODE_ENV === "production") log.setLevel("warn");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
