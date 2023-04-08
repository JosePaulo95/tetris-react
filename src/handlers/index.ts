import { Dispatch } from 'react';

import { isEmptyPiece } from '../controller';

//TODO considerar o uso de UseCallbacks
export const handlePieceGoingDown = (ticks: number, dispatch: Dispatch<any>) => {
  const isTimeToMoveDown = (ticks: number) => {
    return ticks % 10 == 0;
  };
  if (isTimeToMoveDown(ticks)) {
    dispatch({ type: 'piece/move-down' });
    // anim.start('follow');
  }
};

export const handleUserInput = (
  inputx: number | undefined,
  inputy: number | undefined,
  dispatch: Dispatch<any>,
) => {
  if (inputx && inputx > 0) {
    dispatch({ type: 'piece/move-right' });
    dispatch({ type: 'audio/play', payload: 'side_move' });
    // anim.start('follow');
  }
  if (inputx && inputx < 0) {
    dispatch({ type: 'piece/move-left' });
    dispatch({ type: 'audio/play', payload: 'side_move' });
    // anim.start('follow');
  }
  if (inputy && inputy > 0) {
    dispatch({ type: 'piece/rotate' });
    dispatch({ type: 'audio/play', payload: 'rotation_move' });
  }
  if (inputy && inputy < 0) {
    dispatch({ type: 'piece/move-down-max' });
    dispatch({ type: 'audio/play', payload: 'max_down_move' });
    dispatch({ type: 'piece/move-down' });
  }
};

export const handleResetPiece = (blocks: any, dispatch: Dispatch<any>) => {
  if (isEmptyPiece(blocks.piece)) {
    dispatch({ type: 'piece/reset' });
    // anim.reset();
    // anim.start('show');
  }
};

export const handleCollision = (collision: Error, dispatch: Dispatch<any>) => {
  switch (collision.message) {
    case 'piece-down-move-collision':
      try {
        dispatch({ type: 'piece/join' });
        dispatch({ type: 'audio/play', payload: 'piece_join' });
        dispatch({ type: 'board/combinations' });
      } catch (error) {
        dispatch({ type: 'blocks/reset' });
      }
      break;
    case 'piece-side-move-collision':
    case 'piece-rotation-move-collision':
      //add some feedback
      break;
    case 'piece-joinning-collides-or-undefined':
      break;
    default:
      throw collision;
  }
};
