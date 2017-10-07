import App from "./App";
import ReactDOM from "react-dom";
import React from "react";
import LocalStorageMock from "./LocalStorageMock";

it('renders without crashing', () => {
  const div = document.createElement('div');
  LocalStorageMock.injectMock();
  ReactDOM.render(<App />, div);
});