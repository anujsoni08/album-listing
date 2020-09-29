import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux"; // Add provider to make redux store available to project
import "bootstrap/dist/css/bootstrap.css"; // Added bootstrap

import albumListReducer from "./store/reducers/albumList"; // Albumlist reducer
import albumItemReducer from "./store/reducers/albumItem"; // AlbumItem reducer
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  albumList: albumListReducer,
  albumItem: albumItemReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // using chrome extension to track state in browser
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
