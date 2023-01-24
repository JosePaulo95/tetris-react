import { Block } from '../types';
import { transform } from '../utils';

export const randomPiece = () => {
  return createBlock([
    [0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
};

export const createBlock = (initial_grid: number[][]): Block => {
  let pos = { x: 0, y: 0 };

  const display = () => {
    return transform(initial_grid, pos.x, pos.y);
  };
  const translate = (x: number, y: number) => {
    pos = { x: pos.x + x, y: pos.y + y };
  };
  return {
    grid: initial_grid,
    x: 0,
    y: 0,
    display: display,
    translate: translate,
  };
};
