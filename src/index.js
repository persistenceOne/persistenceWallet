import React from "react";
import ReactDOM from "react-dom";
import Main from "./App";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import "./components/Internationalization/i18n";
import "../src/assets/scss/index.css";
import { Provider } from "react-redux";
import { store } from "./store";

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
