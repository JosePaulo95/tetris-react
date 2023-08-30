import { Grid } from '../types';

export const EMPTY_GRID = (): Grid => {
  return [[0]];
};

export const LIMIT_GRID = (
  width: number,
  height: number,
  playable_height: number,
): number[][] => {
  const grid: number[][] = [];
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

export const PIECE_Z_GRIDS = (type: number): Grid[] => {
  const o = type;
  const _ = 0;
  const grids: Grid[] = [
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

export const PIECE_L_GRIDS = (type: number): Grid[] => {
  const o = type;
  const _ = 0;
  const grids: Grid[] = [
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
    [
      [o, o, o],
      [o, _, _],
      [_, _, _],
    ],
  ];

  return grids;
};

export const PIECE_O_GRIDS = (type: number): Grid[] => {
  const o = type;
  const _ = 0;
  const grids: Grid[] = [
    [
      [o, o],
      [o, o],
    ],
  ];

  return grids;
};

export const PIECE_I_GRIDS = (type: number): Grid[] => {
  const o = type;
  const _ = 0;
  const grids: Grid[] = [
    [
      [o, _, _, _],
      [o, _, _, _],
      [o, _, _, _],
      [o, _, _, _],
    ],
    [
      [_, _, _, _],
      [_, _, _, _],
      [o, o, o, o],
      [_, _, _, _],
    ],
  ];

  return grids;
};

export const PIECE_T_GRIDS = (type: number): Grid[] => {
  const o = type;
  const _ = 0;
  const grids: Grid[] = [
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
  ];

  return grids;
};
