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
  switch (action.type) {
    case 'piece/move-down':
      return {
        ...state,
        piece: { ...state.piece, y: state.piece.y + 1 },
      };
    default:
      return state;
  }
}
