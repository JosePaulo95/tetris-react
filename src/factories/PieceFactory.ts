import { useAnimationControls } from 'framer-motion';

import { configs } from '../configs';
import {
  EMPTY_GRID,
  LIMIT_GRID,
  PIECE_A_GRIDS,
  PIECE_B_GRIDS,
  PIECE_C_GRIDS,
  PIECE_D_GRIDS,
} from '../constants';
import { getCurrentGrid, join, transform, wrap, wrapGrid } from '../controller';
import { Block as Piece, Grid } from '../types';
import { BlocksState } from '../types/block';
import { calcPiecesFitness } from './NextPieceCalculator';

export const randomPiece = () => {
  const options = [
    PIECE_A_GRIDS(1),
    PIECE_B_GRIDS(2),
    PIECE_C_GRIDS(3),
    PIECE_D_GRIDS(4),
  ];
  const grids: Grid[] = options[Math.floor(Math.random() * options.length)];
  return createPiece(grids.map((g) => wrapGrid(g, configs.width, configs.height)));
};

const ocorencies: number[] = [0, 0, 0, 0];

export const nextPiece = (boardState: BlocksState) => {
  const options = [
    PIECE_A_GRIDS(1),
    PIECE_B_GRIDS(2),
    PIECE_C_GRIDS(3),
    PIECE_D_GRIDS(4),
  ];
  const pieces = options.map((grids) =>
    createPiece(grids.map((g) => wrapGrid(g, configs.width, configs.height))),
  );
  const floatingGrids = boardState.floating.map((i) =>
    getCurrentGrid({ ...i, y: i.y + 1 }),
  );
  floatingGrids.push(boardState.board);
  const floatingJoinned = floatingGrids
    .filter(Boolean)
    .reduce((acc, curr) => join(acc!, curr!), floatingGrids[0]);

  let index;
  const ocorenciesTotal = ocorencies.reduce((acc, val) => acc + val, 0);
  const ocorenciesNormalized = ocorencies.map((x) => x / ocorenciesTotal);
  if (ocorenciesNormalized.some((i) => i < 0.8 / ocorencies.length)) {
    index = ocorenciesNormalized.findIndex((i) => i < 0.8 / ocorencies.length);
  } else {
    const withScores = calcPiecesFitness(floatingJoinned!, pieces, 0);
    index = withScores.sort((a, b) => a.score - b.score)[0].id;
  }

  ocorencies[index]++;
  return pieces[index];
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
    anim_state: '-',
  };
  return piece;
};
