import { Dispatch } from 'react';

import {
  countCombinations,
  countExactCombinations,
  hasAnyCombinations,
  isEmptyPiece,
} from '../controller';

//TODO considerar o uso de UseCallbacks

const isTimeToMoveDown = (ticks: number) => {
  return ticks % 10 == 0;
};

export const handleMatches = async (
  blocks: any,
  ticks: number,
  dispatch: Dispatch<any>,
): Promise<void> => {
  const matches_count = countExactCombinations(blocks.board);
  if (matches_count > 0) {
    dispatch({ type: 'board/combinations' });
    dispatch({ type: 'score/increment', payload: matches_count });
    dispatch({ type: 'audio/play', payload: 'combination' });
  }
};

export const handleFloatingsGoingDown = (
  blocks: any,
  ticks: number,
  dispatch: Dispatch<any>,
) => {
  if (ticks % 2 == 0) {
    dispatch({ type: 'floating/fall' });
    // anim.start('follow');
  }
};

export const handlePieceGoingDown = (
  blocks: any,
  ticks: number,
  dispatch: Dispatch<any>,
) => {
  if (isTimeToMoveDown(ticks) && !isEmptyPiece(blocks.piece)) {
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
  if (isEmptyPiece(blocks.piece) && blocks.floating.length == 0) {
    dispatch({ type: 'piece/reset' });
    // anim.reset();
    // anim.start('show');
  }
};

export const handleCollision = (collision: Error, dispatch: Dispatch<any>) => {
  switch (collision.message) {
    case 'piece-down-move-collision':
      dispatch({ type: 'audio/play', payload: 'piece_join' });
      dispatch({ type: 'piece/join' });
      break;
    case 'floating-fall-collision':
      dispatch({ type: 'floating/join', payload: collision.name });
      dispatch({ type: 'audio/play', payload: 'piece_join' });
      break;
    case 'piece-side-move-collision':
    case 'piece-rotation-move-collision':
      //add some feedback
      break;
    case 'board-collides-with-limits':
      dispatch({ type: 'blocks/reset' });
      dispatch({ type: 'score/reset' });
      break;
    default:
      throw collision;
  }
};
