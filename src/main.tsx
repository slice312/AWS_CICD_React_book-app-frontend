import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./app/App";
import {BrowserRouter} from "react-router-dom";
import "animate.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
);
