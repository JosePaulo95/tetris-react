import { displayCurrentGrid, isColliding } from '../../../controller';

export const testFloatingFallCollision = (piece, board, index) => {
  const posFall = displayCurrentGrid({
    ...piece,
    y: piece.y + 1,
  });

  if (!posFall || isColliding(posFall, board)) {
    const collision = new Error('floating-fall-collision');
    collision.name = index;
    throw collision;
  }
};

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

export const testJoinCollision = (board, limits) => {
  const limits_collider = limits.map((row) => row.map((c) => (c == 0 ? 1 : 0)));
  if (isColliding(board, limits_collider)) {
    throw new Error('board-collides-with-limits');
  }
};
