import { useAnimationControls } from 'framer-motion';

import { configs } from '../configs';
import {
  EMPTY_GRID,
  LIMIT_GRID,
  PIECE_Z_GRIDS,
  PIECE_L_GRIDS,
  PIECE_O_GRIDS,
  PIECE_I_GRIDS,
} from '../constants';
import { getCurrentGrid, join, transform, wrap, wrapGrid } from '../controller';
import { Block as Piece, Grid } from '../types';
import { BlocksState } from '../types/block';
import { calcPiecesFitness } from './NextPieceCalculator';

export const randomPiece = () => {
  const options = [
    PIECE_Z_GRIDS(1),
    PIECE_L_GRIDS(2),
    PIECE_O_GRIDS(3),
    PIECE_I_GRIDS(4),
  ];
  const grids: Grid[] = options[Math.floor(Math.random() * options.length)];
  return createPiece(grids.map((g) => wrapGrid(g, configs.width, configs.height)));
};

const ocorencies: number[] = [0, 0, 0, 0];
let nextIndex: number;
export const nextPiece = (boardState: BlocksState) => {
  const options = [
    PIECE_Z_GRIDS(1),
    PIECE_L_GRIDS(2),
    PIECE_O_GRIDS(3),
    PIECE_I_GRIDS(4),
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

  const ocorenciesTotal = ocorencies.reduce((acc, val) => acc + val, 0);
  const ocorenciesNormalized = ocorencies.map((x) => x / ocorenciesTotal);
  if (ocorenciesNormalized.some((i) => i < 0.8 / ocorencies.length)) {
    nextIndex = ocorenciesNormalized.findIndex((i) => i < 0.8 / ocorencies.length);
  } else {
    const withScores = calcPiecesFitness(floatingJoinned!, pieces, 0);
    let index = withScores.sort((a, b) => a.score - b.score)[0].id;
    if (index == nextIndex) {
      index = withScores.sort((a, b) => a.score - b.score)[1].id;
    }
    nextIndex = index;
  }

  ocorencies[nextIndex]++;
  return pieces[nextIndex];
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
