import './index.css';

import { GameInputs } from 'game-inputs';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const UserController = () => {
  let stack: number | undefined;
  const popLastInput = () => {
    const aux = stack;
    stack = undefined;
    return aux;
  };
  const stackInput = (input: any) => {
    stack = input;
  };
  return {
    popLastInput,
    stackInput,
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
  userController.stackInput(-1);
});

inputs.down.on('move-right', () => {
  userController.stackInput(1);
});

ReactDOM.render(
  <React.StrictMode>
    <App userController={userController} />
  </React.StrictMode>,
  document.getElementById('root'),
);
