import { isColliding, transform, wrap } from '../utils';

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
