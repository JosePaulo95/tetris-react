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
  let grid_ = initial_grid;

  const display = () => {
    return transform(grid_, pos.x, pos.y);
  };
  const translate = (x: number, y: number) => {
    pos = { x: pos.x + x, y: pos.y + y };
  };
  const resetGrid = (grid: number[][]) => {
    pos.x = 0;
    pos.y = 0;
    grid_ = grid;
  };
  return {
    resetGrid: resetGrid,
    grid: initial_grid,
    x: pos.x,
    y: 0,
    display: display,
    translate: translate,
  };
};
