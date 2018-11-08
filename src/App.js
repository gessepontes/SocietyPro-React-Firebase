import React from "react";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import history from "./routes/history";


import rootReducer from "./reducers/rootReducer";

import Routes from "./routes";
import Layout from "./utils/Layout";
import { ConnectedRouter } from "connected-react-router";

const middlewares = [routerMiddleware(history), thunk];

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(thunk)),
  applyMiddleware(...middlewares)
);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Routes />
      </Layout>
    </ConnectedRouter>
  </Provider>

);

export default App;