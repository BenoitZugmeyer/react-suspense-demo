import { default as React, unstable_AsyncMode as AsyncMode} from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

const container = document.createElement("div");
document.body.appendChild(container);
ReactDOM.render(<AsyncMode><App /></AsyncMode>, container);
