import { GameInputs } from 'game-inputs';

export const userController = {
  current_input_x: 0,
  current_input_y: 0,
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
