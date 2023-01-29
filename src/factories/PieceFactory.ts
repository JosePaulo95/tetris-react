import { useAnimationControls } from 'framer-motion';

import { configs } from '../configs';
import { EMPTY_GRID, LIMIT_GRID, PIECE_A_GRIDS } from '../constants';
import { transform, wrap, wrapGrid } from '../controller';
import { Block as Piece, Grid } from '../types';

export const randomPiece = () => {
  const grids: Grid[] = PIECE_A_GRIDS(1);
  return createPiece(grids.map((g) => wrapGrid(g, configs.width, configs.height)));
};

export const erasedPiece = () => {
  const grid: Grid = EMPTY_GRID();
  const wrapped = wrapGrid(grid, configs.width, configs.height);
  return createPiece([wrapped]);
};

export const emptyPiece = () => {
  const grid: Grid = EMPTY_GRID();
  return wrapGrid(grid, configs.width, configs.height);
};

export const limitsPiece = () => {
  const grid: Grid = LIMIT_GRID(configs.width, configs.height, configs.playable_height);
  return wrapGrid(grid, configs.width, configs.height);
};

export const createPiece = (initial_grid: Grid[]): Piece => {
  const piece = {
    initial_grid: initial_grid,
    x: 0,
    y: 0,
    rotations: 0,
  };
  return piece;
};
