const get = (board: number[][], x: number, y: number) => {
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

export const checksCollision = (boardA: number[][], boardB: number[][]) => {
  if (boardA.length != boardB.length || boardA[0]?.length != boardB[0]?.length) {
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
