import { GameInputs } from 'game-inputs';

export const userController = {
  _current_input_y: 0,
  _current_input_x: 0,
  get current_input_x() {
    if (this._current_input_x) {
      const aux = Number(this._current_input_x);
      this._current_input_x = undefined;
      return aux;
    }
  },
  set current_input_x(value) {
    this._current_input_x = value;
  },
  get current_input_y() {
    return this._current_input_y;
  },
  set current_input_y(value) {
    this._current_input_y = value;
  },
};

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
  userController.current_input_x = -1;
});

inputs.down.on('move-right', () => {
  userController.current_input_x = 1;
});

inputs.down.on('rotate', () => {
  userController.setInputY(-1);
});
