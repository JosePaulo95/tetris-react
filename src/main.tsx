import './index.css';

import { GameInputs } from 'game-inputs';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const UserController = () => {
  let current_input_x: number | undefined;
  let current_input_y: number | undefined;

  const getInputX = () => {
    const aux = current_input_x;
    current_input_x = undefined;
    return aux;
  };
  const getInputY = () => {
    const aux = current_input_y;
    current_input_y = undefined;
    return aux;
  };
  const setInputX = (input: any) => {
    current_input_x = input;
  };
  const setInputY = (input: any) => {
    current_input_y = input;
  };
  return {
    getInputX,
    setInputX,
    getInputY,
    setInputY,
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
inputs.bind('rotate', 'ArrowUp');

inputs.down.on('move-left', () => {
  userController.setInputX(-1);
});

inputs.down.on('move-right', () => {
  userController.setInputX(1);
});

inputs.down.on('rotate', () => {
  userController.setInputY(-1);
});

ReactDOM.render(
  <React.StrictMode>
    <App userController={userController} />
  </React.StrictMode>,
  document.getElementById('root'),
);
