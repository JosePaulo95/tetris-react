import { configs } from '../configs';
import { EMPTY_GRID, LIMIT_GRID, PIECE_A_GRIDS } from '../constants';
import { transform, wrap, wrapGrid } from '../controller';
import { Block as Piece, Grid } from '../types';

export const randomPiece = () => {
  const grids: Grid[] = PIECE_A_GRIDS(1);
  return createPiece(grids.map((g) => wrapGrid(g, configs.width, configs.height)));
};

export const emptyPiece = () => {
  const grid: Grid = EMPTY_GRID();
  return createPiece([wrapGrid(grid, configs.width, configs.height)]);
};

export const limitsPiece = () => {
  const grid: Grid = LIMIT_GRID(configs.width, configs.height, configs.playable_height);
  return createPiece([wrapGrid(grid, configs.width, configs.height)]);
};

export const createPiece = (initial_grid: Grid[]): Piece => {
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
