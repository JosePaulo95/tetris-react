import { createBlock } from '../factories/PieceFactory';

export const EMPTY_GRID = () => {
  return [[0]];
};

export const LIMIT_GRID = (width, height, playable_height) => {
  const grid = [];
  for (let i = 0; i < height; i++) {
    grid.push([]);
    for (let j = 0; j < width; j++) {
      if (i < height - playable_height) {
        grid[i].push(0);
      } else {
        grid[i].push(-1);
      }
    }
  }
  return grid;
};

export const PIECE_A_GRIDS = (type) => {
  const o = type;
  const _ = 0;
  const grids = [
    [
      [o, o, _],
      [_, o, o],
      [_, _, _],
    ],
    [
      [_, _, o],
      [_, o, o],
      [_, o, _],
    ],
  ];

  return grids;
};

export const PIECE_B_GRIDS = (type) => {
  const o = type;
  const _ = 0;
  const grids = [
    [
      [o, _, _],
      [o, _, _],
      [o, o, _],
    ],
    [
      [_, _, o],
      [o, o, o],
      [_, _, _],
    ],
    [
      [o, o, _],
      [_, o, _],
      [_, o, _],
    ],
  ];

  return grids;
};

export const PIECE_C_GRIDS = (type) => {
  const o = type;
  const _ = 0;
  const grids = [
    [
      [_, o, _],
      [o, o, o],
      [_, _, _],
    ],
    [
      [_, o, _],
      [o, o, _],
      [_, o, _],
    ],
    [
      [_, _, _],
      [o, o, o],
      [_, o, _],
    ],
    [
      [_, o, _],
      [_, o, o],
      [_, o, _],
    ],
  ];

  return grids;
};
