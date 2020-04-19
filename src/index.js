import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./store/reducers/rootReducer";
import { getAuthUser } from "./store/actions/userActions";
import { fetchBikes } from "./store/actions/bikeActions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(fetchBikes());
store.dispatch(getAuthUser());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
