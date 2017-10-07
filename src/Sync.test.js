import Sync from "./Sync";
import ReactDOM from "react-dom";
import React from "react";

it('renders without crashing', () => {
  const div = document.createElement('div');
  let data = {test: 1, test2: 2, test3: 3};
  ReactDOM.render(<Sync data={data}/>, div);
});