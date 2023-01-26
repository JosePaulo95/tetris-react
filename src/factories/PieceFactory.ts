import { PIECE_A_GRIDS } from '../constants';
import { transform, wrapGrid } from '../controller';
import { Block, Grid } from '../types';

export const randomPiece = () => {
  const grids: Grid[] = PIECE_A_GRIDS(1);
  return createBlock(grids.map((g) => wrapGrid(g, 5, 8)));
};

export const createBlock = (initial_grid: Grid[]): Block => {
  let pos = { x: 0, y: 0 };
  const grid_ = initial_grid;
  let rotation = 0;

  const currentGrid = () => {
    return initial_grid[0]; //transform(grid_[rotation], pos.x, pos.y);
  };
  const translate = (x: number, y: number) => {
    pos = { x: pos.x + x, y: pos.y + y };
  };
  const resetGrid = (grid: number[][]) => {
    pos.x = 0;
    pos.y = 0;
    grid_[0] = grid;
  };
  const rotate = () => {
    rotation = (rotation + 1) % 2;
  };
  return {
    resetGrid: resetGrid,
    grid: initial_grid,
    x: pos.x,
    y: 0,
    currentGrid: currentGrid,
    translate: translate,
    rotate: rotate,
  };
};
