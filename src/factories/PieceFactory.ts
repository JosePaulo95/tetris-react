import { useAnimationControls } from 'framer-motion';

import { configs } from '../configs';
import {
  EMPTY_GRID,
  LIMIT_GRID,
  PIECE_I_GRIDS,
  PIECE_L_GRIDS,
  PIECE_O_GRIDS,
  PIECE_T_GRIDS,
  PIECE_Z_GRIDS,
} from '../constants';
import {
  BoardState,
  getCurrentGrid,
  join,
  transform,
  wrap,
  wrapGrid,
} from '../controller';
import { Block as Piece, Grid } from '../types';
import { Block, BlocksState } from '../types/block';
import { calcPiecesFitness } from './NextPieceCalculator';

const allPieces = (): Block[] => {
  const options = [
    PIECE_Z_GRIDS(1),
    PIECE_L_GRIDS(2),
    PIECE_O_GRIDS(3),
    PIECE_I_GRIDS(4),
    PIECE_T_GRIDS(5),
  ];
  const pieces = options.map((grids) =>
    createPiece(grids.map((g) => wrapGrid(g, configs.width, configs.height))),
  );
  return pieces;
};

const calcGridPosFloatingJoin = (boardState: BlocksState): Grid => {
  const floatingGrids = boardState.floating.map((i) =>
    getCurrentGrid({ ...i, y: i.y + 1 }),
  );
  const floatingJoinned = floatingGrids
    .filter(Boolean)
    .reduce((acc, curr) => join(acc!, curr!), boardState.board);

  return floatingJoinned || boardState.board;
};

export const randomPiece = () => {
  const pieces = allPieces();
  const index = Math.floor(Math.random() * pieces.length);
  return pieces[index];
};

const ocorencies: number[] = [0, 0, 0, 0, 0];
let nextIndex: number;
export const nextPiece = (boardState: BlocksState) => {
  const pieces = allPieces();
  const floatingJoinned = calcGridPosFloatingJoin(boardState);
  const ocorenciesNormalized = normalizeOcorencies(ocorencies);
  const avgHeight = calcAverageHeight(floatingJoinned);

  if (avgHeight == 0) {
    nextIndex = ocorenciesNormalized.sort()[0];
  } else if (ocorenciesNormalized.some((i) => i < 0.8 / ocorencies.length)) {
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
    key: 0,
    initial_grid: initial_grid,
    x: 0,
    y: 0,
    rotations: 0,
    anim_state: '-',
  };
  return piece;
};
const calcAverageHeight = (grid: Grid): number => {
  let totalHeight = 0;
  const numberOfColumns = grid.length;

  if (numberOfColumns === 0) {
    return 0;
  }

  for (let col = 0; col < numberOfColumns; col++) {
    let height = 0;
    for (let row = 0; row < grid[col].length; row++) {
      if (grid[col][row] !== 0) {
        height++;
      }
    }
    totalHeight += height;
  }

  return totalHeight / numberOfColumns;
};
const normalizeOcorencies = (ocorencies: number[]): number[] => {
  const ocorenciesTotal = ocorencies.reduce((acc, val) => acc + val, 0);
  const ocorenciesNormalized = ocorencies.map((x) => x / ocorenciesTotal);
  return ocorenciesNormalized;
};
