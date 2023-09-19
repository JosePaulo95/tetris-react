import { GameInputs } from 'game-inputs';
import Hammer from 'hammerjs';

export const userController = {
  _current_input_y: 0 as number | undefined,
  _current_input_x: 0 as number | undefined,
  get current_input_x(): number | undefined {
    if (this._current_input_x) {
      const aux = Number(this._current_input_x);
      this._current_input_x = undefined;
      return aux;
    }
  },
  set current_input_x(value: number | undefined) {
    this._current_input_x = value;
  },
  get current_input_y(): number {
    const aux = Number(this._current_input_y);
    this._current_input_y = undefined;
    return aux;
  },
  set current_input_y(value: number) {
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
inputs.bind('move-down', 'ArrowDown');
inputs.bind('move-left', 'KeyA');
inputs.bind('move-right', 'KeyD');
inputs.bind('rotate', 'KeyW');
inputs.bind('move-down', 'KeyS');

inputs.down.on('move-left', () => {
  userController.current_input_x = -1;
});

inputs.down.on('move-right', () => {
  userController.current_input_x = 1;
});

inputs.down.on('rotate', () => {
  userController.current_input_y = 1;
});

inputs.down.on('move-down', () => {
  userController.current_input_y = -1;
});

const hammer = new Hammer(dom);
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammer.get('swipe').set({ threshold: 0.3 });
hammer.on('swipeleft', function (event: HammerInput) {
  userController.current_input_x = -1;
});

hammer.on('swiperight', function (event: HammerInput) {
  userController.current_input_x = 1;
});

hammer.on('swipeup tap', function (event: HammerInput) {
  userController.current_input_y = 1;
});

hammer.on('swipedown', function (event: HammerInput) {
  userController.current_input_y = -1;
});

// Add more event listeners for other gestures as needed
