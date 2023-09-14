import { getCurrentGrid, isColliding, join } from '../../../controller';
import { Block, Grid } from '../../../types';

export const testFloatingFallCollision = (
  piece: Block,
  board: Grid,
  limits: Grid,
  index: number,
): void | Error => {
  const posFall = getCurrentGrid({
    ...piece,
    y: piece.y + 1,
  });
  const curGrid = getCurrentGrid(piece);

  if (!posFall || isColliding(posFall, board)) {
    const current = getCurrentGrid(piece);
    const limits_collider = limits.map((row) => row.map((c) => (c == 0 ? 1 : 0)));
    if (current && isColliding(current, limits_collider)) {
      throw new Error('board-collides-with-limits');
    }

    const joinCollision = new Error('floating-fall-collision');
    joinCollision.name = `${index}`;
    throw joinCollision;
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

export const testRotationCollision = (piece: Block, board: Grid): Block => {
  const closestValidX =
    [0, -1, 1, -2, 2, -3, 3, 4, -4].find((index) =>
      getCurrentGrid({
        ...piece,
        rotations: piece.rotations + 1,
        x: piece.x + index,
      }),
    ) || 0;
  const posMove = {
    ...piece,
    rotations: piece.rotations + 1,
    x: piece.x + closestValidX,
  };
  const posMoveGrid = getCurrentGrid(posMove);
  if (!posMoveGrid || isColliding(posMoveGrid, board)) {
    throw new Error('piece-rotation-move-collision');
  }

  return posMove;
};

export const testJoinCollision = (board: Grid, limits: Grid): void | Error => {
  const limits_collider = limits.map((row) => row.map((c) => (c == 0 ? 1 : 0)));
  if (isColliding(board, limits_collider)) {
    throw new Error('board-collides-with-limits');
  }
};
