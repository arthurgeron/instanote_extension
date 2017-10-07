import Loginscreen from "./Loginscreen";
import LocalStorageMock from "./LocalStorageMock";
import ReactDOM from "react-dom";
import React from "react";

it('renders without crashing', () => {
  const div = document.createElement('div');
  LocalStorageMock.injectMock();
  ReactDOM.render(<Loginscreen />, div);
});