import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";

import App from "./app/App";
import store from "./app/store";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
