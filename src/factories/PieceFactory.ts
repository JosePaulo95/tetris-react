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
  const piece = {
    x: 0,
    y: 0,
    rotations: 0,
    currentGrid: function () {
      return transform(
        initial_grid[this.rotations % initial_grid.length],
        this.x,
        this.y,
      );
    },
  };
  return piece;
};
