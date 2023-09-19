import { createPiece, emptyPiece } from '../factories/PieceFactory';
import { Block, Grid } from '../types';
import { splitDisconnectedGraphs } from './graph';

export const getCurrentGrid = (block: Block): Grid | undefined => {
  const b = transform(
    block.initial_grid[block.rotations % block.initial_grid.length],
    block.x,
    block.y,
  );
  return b;
};

export const wrapGrid = (
  original_grid: Grid,
  new_width: number,
  new_height: number,
): Grid => {
  if (original_grid.length > new_height || original_grid[0]?.length > new_width) {
    throw new Error('Wrapping a grid into a smaller is not allowed');
  }

  const padding = Math.floor((new_width - original_grid[0]?.length) / 2);
  const grid: number[][] = [];
  for (let i = 0; i < new_height; i++) {
    grid.push([]);
    for (let j = 0; j < new_width; j++) {
      grid[i].push(get(original_grid, i, j - padding));
    }
  }

  return grid;
};

const get = (board: Grid, x: number, y: number): number => {
  if (board[x] && board[x][y]) {
    return board[x][y];
  } else {
    return 0;
  }
};

export const transform = (board: number[][], x: number, y: number): Grid | undefined => {
  const b: number[][] = [];

  for (let i = 0; i < board.length; i++) {
    b.push([]);
    for (let j = 0; j < board[i].length; j++) {
      b[i].push(get(board, i - y, j - x));
    }
  }

  if (
    b.reduce((acc, cur) => acc + cur.reduce((acc1, cur1) => acc1 + cur1, 0), 0) ==
    board.reduce((acc, cur) => acc + cur.reduce((acc1, cur1) => acc1 + cur1, 0), 0)
  ) {
    return b;
  } else {
    return undefined;
  }
};

export const wrap = (board: number[][]): Grid => {
  const wrapped: number[][] = [];
  const width = board.length;
  const height = board[0] ? board[0].length : 0;

  for (let i = 0; i < width + 2; i++) {
    wrapped.push([]);
    for (let j = 0; j < height + 2; j++) {
      wrapped[i].push(0);
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      wrapped[i + 1][j + 1] = board[i][j];
    }
  }

  return wrapped;
};

export const isColliding = (boardA: number[][], boardB: number[][]): boolean | Error => {
  if (!hasSameDimensions(boardA, boardB)) {
    throw new Error('Comparing boards with different sizes is not allowed.');
  }

  for (let i = 0; i < boardA.length; i++) {
    for (let j = 0; j < boardA[i].length; j++) {
      if (boardA[i][j] > 0 && boardB[i][j] > 0) {
        return true;
      }
    }
  }

  return false;
};

export const join = (boardA: number[][], boardB: number[][]): Grid => {
  if (!hasSameDimensions(boardA, boardB)) {
    throw new Error('Joining boards with different sizes is not allowed.');
  }
  if (!isColliding(boardA, boardB)) {
    //throw new Error('Joining colliding boards is not allowed.');
  }

  const join = boardA.map((row) => [...row]); // cria uma cópia de boardA

  for (let i = 0; i < boardB.length; i++) {
    for (let j = 0; j < boardB[i].length; j++) {
      if (boardB[i][j] > 0) {
        join[i][j] = boardB[i][j];
      }
    }
  }

  return join;
};

const hasSameDimensions = (boardA: number[][], boardB: number[][]): boolean => {
  return boardA.length == boardB.length && boardA[0]?.length == boardB[0]?.length;
};

export type BoardState = {
  remaining: Grid;
  floating: Block[];
  matching: Block[];
};

export const splitDisconnected = (grid: Grid): Block[] => {
  const splitted = splitDisconnectedGraphs(grid);
  const blocks: Block[] = splitted.map((i) => {
    return { ...createPiece([i]), anim_state: 'follow' };
  });
  return blocks;
};

export const removeMatches = (board: number[][]): BoardState => {
  const b: Grid = emptyPiece();
  const f: Grid = emptyPiece();
  const m: Grid = emptyPiece();

  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i].every((cell) => cell !== 0)) {
      m[i] = board[i].map((i) => 10);
    } else {
      b[i] = board[i];
    }
  }

  const splitted = splitDisconnected(b);
  const grounded = splitted
    .filter((i) => !getCurrentGrid({ ...i, y: i.y + 1 }))
    .reduce((cur, acc) => join(cur, getCurrentGrid(acc) || emptyPiece()), emptyPiece());
  const floating = splitted.filter((i) => getCurrentGrid({ ...i, y: i.y + 1 }));

  // const disc = splitDisconnected(b);

  // for (i = i - 1; i >= 0; i--) {
  //   if (board[i].some((cell) => cell !== 0)) {
  //     break;
  //   }
  // }

  // for (; i >= 0; i--) {
  //   f[i] = board[i];
  // }

  const aux = {
    remaining: grounded,
    floating: floating,
    matching: splitDisconnected(m),
  };

  return aux;
};

export const removeMatchesMoveDownBlocks = (board: number[][]): Grid => {
  const numRows = board.length;
  const numCols = board[0].length;

  const rowsToRemove: number[] = [];

  for (let row = 0; row < numRows; row++) {
    if (board[row].every((cell) => cell > 0)) {
      rowsToRemove.push(row);
    }
  }

  if (rowsToRemove.length === 0) {
    return board; // no rows to remove, return the original board
  }

  const newBoard: number[][] = [];

  let newRow = numRows - 1; // start at the bottom of the board
  for (let row = numRows - 1; row >= 0; row--) {
    if (!rowsToRemove.includes(row)) {
      newBoard[newRow] = [...board[row]]; // copy the row to its new position
      newRow--;
    }
  }

  // fill the top rows with zeros
  for (let row = 0; row < rowsToRemove.length; row++) {
    newBoard[row] = new Array(numCols).fill(0);
  }

  return newBoard;
};

export const hasAnyCombinations = (board: Grid): boolean => {
  return board.some((row) => row.every((i) => i > 0));
};

export const countExactCombinations = (board: Grid): number => {
  return board.filter((row) => row.every((i) => i > 0)).length;
};

export const countCombinations = (board: Grid, piece: Block) => {
  const piece_grid = getCurrentGrid(piece);
  if (!piece_grid) {
    return 0;
  }
  const joinned = join(board, piece_grid);
  const full_combinations = joinned.filter((row) => row.every((i) => i > 0)).length;
  const partial_combinations = joinned.filter(
    (row) => row.filter((j) => j === 0).length === 1,
  ).length;
  return full_combinations + 0.7 * partial_combinations;
};

export const calcAvgHeight = (board: Grid): number => {
  let totalHeight = 0;
  const numCols = board[0].length;

  for (let col = 0; col < numCols; col++) {
    let colHeight = 0;
    for (let row = 0; row < board.length; row++) {
      if (board[row][col] > 0) {
        colHeight = board.length - row;
        break;
      }
    }
    totalHeight += colHeight;
  }

  return totalHeight / numCols;
};

export const clear = (board: Grid): Grid => {
  const b = board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      b[i][j] = 0;
    }
  }
  return b;
};

export const isEmptyPiece = (piece: Block) => {
  const grid = getCurrentGrid(piece);
  if (grid) {
    return grid.every((row) => row.every((cell) => cell == 0));
  } else {
    return false;
  }
};
