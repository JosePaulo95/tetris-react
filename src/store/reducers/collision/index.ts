import { displayCurrentGrid, isColliding } from '../../../controller';

export const testDownCollision = (piece, board) => {
  const posMove = displayCurrentGrid({
    ...piece,
    y: piece.y + 1,
    anim_state: 'follow',
  });

  if (!posMove || isColliding(posMove, board)) {
    throw new Error('piece-down-move-collision');
  }
};

export const testSideCollision = (piece, board, dir) => {
  const posMove = displayCurrentGrid({
    ...piece,
    x: piece.x + dir,
    anim_state: 'follow',
  });

  if (!posMove || isColliding(posMove, board)) {
    throw new Error('piece-side-move-collision');
  }
};

export const testRotationCollision = (piece, board) => {
  const posMove = displayCurrentGrid({
    ...piece,
    rotations: piece.rotations + 1,
  });

  if (!posMove || isColliding(posMove, board)) {
    throw new Error('piece-rotation-move-collision');
  }
};

export const testJoinCollision = (piece, limits) => {
  const posMove = displayCurrentGrid(piece);
  const limits_collider = limits.map((row) => row.map((c) => (c == 0 ? 1 : 0)));
  if (!posMove || isColliding(posMove, limits_collider)) {
    throw new Error('piece-joining-collides');
  }
};
