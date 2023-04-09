import { getCurrentGrid, isColliding } from '../../../controller';
import { Block, Grid } from '../../../types';

export const testFloatingFallCollision = (
  piece: Block,
  board: Grid,
  index: number,
): void | Error => {
  const posFall = getCurrentGrid({
    ...piece,
    y: piece.y + 1,
  });

  if (!posFall || isColliding(posFall, board)) {
    const collision = new Error('floating-fall-collision');
    collision.name = `${index}`;
    throw collision;
  }
};

export const testDownCollision = (piece: Block, board: Grid): void | Error => {
  const posMove = getCurrentGrid({
    ...piece,
    y: piece.y + 1,
    anim_state: 'follow',
  });

  if (!posMove || isColliding(posMove, board)) {
    throw new Error('piece-down-move-collision');
  }
};

export const testSideCollision = (
  piece: Block,
  board: Grid,
  dir: number,
): void | Error => {
  const posMove = getCurrentGrid({
    ...piece,
    x: piece.x + dir,
    anim_state: 'follow',
  });

  if (!posMove || isColliding(posMove, board)) {
    throw new Error('piece-side-move-collision');
  }
};

export const testRotationCollision = (piece: Block, board: Grid): void | Error => {
  const posMove = getCurrentGrid({
    ...piece,
    rotations: piece.rotations + 1,
  });

  if (!posMove || isColliding(posMove, board)) {
    throw new Error('piece-rotation-move-collision');
  }
};

export const testJoinCollision = (board: Grid, limits: Grid): void | Error => {
  const limits_collider = limits.map((row) => row.map((c) => (c == 0 ? 1 : 0)));
  if (isColliding(board, limits_collider)) {
    throw new Error('board-collides-with-limits');
  }
};
