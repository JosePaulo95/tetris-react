import { emptyPiece, limitsPiece, randomPiece } from '../../factories/PieceFactory';
import { Block } from '../../types';

type BlocksState = {
  piece: Block;
  board: Block;
  limits: Block;
};

const INITIAL_STATE = {
  piece: randomPiece(),
  board: emptyPiece(),
  limits: limitsPiece(),
};

export default function blocks(state: BlocksState = INITIAL_STATE, action): BlocksState {
  console.log(state);
  switch (action.type) {
    case 'move':
      return { ...state };
    default:
      return state;
  }
}
