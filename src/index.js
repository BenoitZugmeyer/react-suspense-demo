import { default as React, unstable_AsyncMode as AsyncMode} from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

ReactDOM.render(<AsyncMode><App /></AsyncMode>, document.querySelector("#main"));
