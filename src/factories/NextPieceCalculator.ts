import { PIECE_Z_GRIDS } from '../constants';
import {
  calcAvgHeight,
  countCombinations,
  getCurrentGrid,
  isColliding,
  join,
} from '../controller';
import { Block, Grid } from '../types';

export type fitnesses = {
  id: number;
  score: number;
};

export const calcPiecesFitness = (
  board: Grid,
  pieces: Block[],
  targetHeight: number,
): fitnesses[] => {
  const avgHeight = calcAvgHeight(board); // Supondo que calcAvgHeight retorna a altura média atual do tabuleiro
  const fitnessScores: fitnesses[] = Array.from({ length: pieces.length }, (_, i) => ({
    id: i,
    score: 10,
  }));
  // para cada peça
  for (let i = 0; i < pieces.length; i++) {
    const maxMatches = calcMaxMatches(board, pieces[i]);
    const resultingHeight = avgHeight - maxMatches;
    const score = Math.abs(targetHeight - resultingHeight);
    fitnessScores[i].score = Math.min(fitnessScores[i].score, score);
  }

  return fitnessScores;
};

export const calcMaxMatches = (board: Grid, piece: Block): number => {
  let max = 0;
  // para cada rotação
  for (let j = 0; j < piece.initial_grid.length; j++) {
    const rotatedPiece = { ...piece, rotations: j };
    const possibleXPositions = getPossiveisX(rotatedPiece);
    for (let k = 0; k < possibleXPositions.length; k++) {
      const pieceAtX = { ...rotatedPiece, x: possibleXPositions[k] };
      const maxYPosition = getMaxY(pieceAtX, board);
      if (maxYPosition) {
        const pieceAtMaxY = { ...pieceAtX, y: maxYPosition };
        const matchCount = countCombinations(board, pieceAtMaxY);
        max = Math.max(max, matchCount);
      }
    }
  }

  return max;
};

export function getMaxY(piece: Block, board: Grid): number | undefined {
  let p_grid, colide;
  do {
    piece = { ...piece, y: piece.y + 1 };
    p_grid = getCurrentGrid(piece);
    colide = p_grid ? isColliding(p_grid, board) : undefined;
  } while (p_grid && !colide);

  const result = piece.y - 1;

  if (result === -1) {
    return undefined;
  }

  return result;
}

export function getPossiveisX(piece: Block): number[] {
  const xs = [];
  const grid = getCurrentGrid(piece);
  if (!grid) {
    return [];
  }
  const width = Array.from(grid[0]).length;
  for (let x = -width; x <= width; x++) {
    if (getCurrentGrid({ ...piece, x })) {
      xs.push(x);
    }
  }

  return xs;
}
