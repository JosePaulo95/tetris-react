import { createBlock } from '../factories/PieceFactory';

// export const CLEAR_BOARD = createBlock([
//   [
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//   ],
// ]);

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
