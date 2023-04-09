import { useAnimationControls } from 'framer-motion';

import { Block } from '../types';

export const pieceAnimationController = (piece: Block) => {
  const controller = useAnimationControls();

  return {
    controller: controller,
    reset: function () {
      controller.set({
        x: 0,
        y: 0,
      });
    },
    start: function (name: string) {
      switch (name) {
        case 'show':
          controller.start({
            scaleX: [0.5, 1.2, 1],
            scaleY: [0.5, 1.2, 1],
            transition: { duration: 0.3 },
          });
          break;
        case 'follow':
          controller.start({
            x: piece.x * (100 / 3),
            y: piece.y * (100 / 3),
          });
          break;
        default:
          break;
      }
    },
  };
};
