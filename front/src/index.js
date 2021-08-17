import React from "react";
import ReactDOM from "react-dom";
import AppProvider from "./appContext/provider";
import App from "./App";

ReactDOM.render(
  <React.Fragment>
    <AppProvider>
      <App />
    </AppProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
