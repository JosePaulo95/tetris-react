import { isColliding, transform, wrap } from '../utils';

const outer_laterals: number[][] = [
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
];
const outer_bottom: number[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
];

export const applyDownMove = (piece: number[][], board: number[][]): number[][] => {
  if (willBottomCollide(piece, board)) {
    throw new Error('Trying to move down piece even on collision.');
  }
  const piece_pos_down_move = transform(piece, 0, 1);
  return piece_pos_down_move;
};

export const willBottomCollide = (piece: number[][], board: number[][]): boolean => {
  const wrapped_piece = wrap(piece);
  const wrapped_pos_down_move = transform(wrapped_piece, 0, 1);
  const will_ground_collide = isColliding(wrapped_pos_down_move, outer_bottom);

  const piece_pos_down_move = transform(piece, 0, 1);
  const will_board_collide = isColliding(piece_pos_down_move, board);

  return will_ground_collide || will_board_collide;
};

export const willSideCollide = (
  piece: number[][],
  board: number[][],
  direction: number,
): boolean => {
  const wrapped_piece = wrap(piece);
  const wrapped_pos_side_move = transform(wrapped_piece, direction, 0);
  return isColliding(wrapped_pos_side_move, outer_laterals);
};

export const applySideMove = (
  piece: number[][],
  board: number[][],
  direction: number,
): number[][] => {
  if (willSideCollide(piece, board, direction)) {
    throw new Error('Trying to move down piece even on collision.');
  }
  const piece_pos_side_move = transform(piece, direction, 0);
  return piece_pos_side_move;
};
