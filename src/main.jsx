import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import "./style/style.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
