import './index.css';

import { GameInputs } from 'game-inputs';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const UserController = () => {
  let current_input: number | undefined;
  const getInput = () => {
    return current_input;
  };
  const setInput = (input: any) => {
    current_input = input;
  };
  return {
    getInput,
    setInput,
  };
};

const userController = UserController();

const dom = document.documentElement;
const inputs = new GameInputs(dom, {
  preventDefaults: true,
  allowContextMenu: false,
  stopPropagation: true,
  disabled: false,
});
inputs.bind('move-left', 'ArrowLeft');
inputs.bind('move-right', 'ArrowRight');

inputs.down.on('move-left', () => {
  userController.setInput(-1);
});

inputs.down.on('move-right', () => {
  userController.setInput(1);
});

ReactDOM.render(
  <React.StrictMode>
    <App userController={userController} />
  </React.StrictMode>,
  document.getElementById('root'),
);
