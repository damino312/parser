import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL = "http://localhost:4000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
