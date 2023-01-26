import { Grid } from '../types';

export const wrapGrid = (
  original_grid: Grid,
  new_width: number,
  new_height: number,
): Grid => {
  if (original_grid.length > new_height || original_grid[0]?.length > new_width) {
    throw new Error('Wrapping a grid into a smaller is not allowed');
  }

  const padding = Math.ceil((new_width - original_grid.length) / 2);
  const grid = [];
  for (let i = 0; i < new_height; i++) {
    grid.push([]);
    for (let j = 0; j < new_width; j++) {
      grid[i].push(get(original_grid, i - padding, j));
    }
  }

  return grid;
};

const get = (board: Grid, x: number, y: number) => {
  if (board[x] && board[x][y]) {
    return board[x][y];
  } else {
    return 0;
  }
};

export const transform = (board: number[][], x: number, y: number) => {
  const b: number[][] = [];

  for (let i = 0; i < board.length; i++) {
    b.push([]);
    for (let j = 0; j < board[i].length; j++) {
      b[i].push(get(board, i - y, j - x));
    }
  }

  return b;
};

export const wrap = (board: number[][]) => {
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

export const isColliding = (boardA: number[][], boardB: number[][]) => {
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

export const join = (boardA: number[][], boardB: number[][]) => {
  if (!hasSameDimensions(boardA, boardB)) {
    throw new Error('Joining boards with different sizes is not allowed.');
  }
  if (!isColliding(boardA, boardB)) {
    //throw new Error('Joining colliding boards is not allowed.');
  }

  const join = boardA;

  for (let i = 0; i < boardB.length; i++) {
    for (let j = 0; j < boardB[i].length; j++) {
      if (boardB[i][j] > 0) {
        join[i][j] = boardB[i][j];
      }
    }
  }

  return join;
};

const hasSameDimensions = (boardA: number[][], boardB: number[][]) => {
  return boardA.length == boardB.length && boardA[0]?.length == boardB[0]?.length;
};

export const removeMatches = (board: number[][]) => {
  const b = board;
  for (let i = board.length - 1; i >= 0; i--) {
    if (!b[i].includes(0)) {
      b[i] = b[i].map((_) => 0);
      for (let j = i; j > 0; j--) {
        const aux = b[j];
        b[j] = b[j - 1];
        b[j - 1] = aux;
      }
    }
  }

  return b;
};

export const clear = (board: number[][]) => {
  const b = board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      b[i][j] = 0;
    }
  }
  return b;
};
