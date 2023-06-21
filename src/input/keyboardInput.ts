import { GameInputs } from 'game-inputs';

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

// Add touch-related event listeners
dom.addEventListener('touchstart', handleTouchStart, false);
dom.addEventListener('touchmove', handleTouchMove, false);
dom.addEventListener('touchend', handleTouchEnd, false);

// Handle touch start event
function handleTouchStart(event: TouchEvent): void {
  // Prevent default touch behavior
  event.preventDefault();

  // Get touch coordinates
  const touchX: number = event.touches[0].clientX;
  const touchY: number = event.touches[0].clientY;

  // Determine touch direction based on touch coordinates
  // and update userController accordingly
  // Determine touch direction based on touch coordinates and update userController accordingly
  const touchThreshold = 20; // Adjust this value to control the sensitivity

  if (Math.abs(touchX - window.innerWidth / 2) > touchThreshold) {
    if (touchX < window.innerWidth / 2) {
      userController.current_input_x = 1; // Move left
    } else {
      userController.current_input_x = -1; // Move right
    }
  } else {
    userController.current_input_x = 0; // No horizontal movement
  }

  if (Math.abs(touchY - window.innerHeight / 2) > touchThreshold) {
    if (touchY < window.innerHeight / 2) {
      userController.current_input_y = -1; // Move up
    } else {
      userController.current_input_y = 1; // Move down
    }
  } else {
    userController.current_input_y = 0; // No vertical movement
  }
}

// Handle touch move event
function handleTouchMove(event: TouchEvent): void {
  event.preventDefault();
  // You can handle touch move events if needed
}

// Handle touch end event
function handleTouchEnd(event: TouchEvent): void {
  event.preventDefault();
  // Reset userController values to neutral state
  userController.current_input_x = 0;
  userController.current_input_y = 0;
}
