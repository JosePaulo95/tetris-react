import { displayCurrentGrid, isColliding } from '../../controller';
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

const testCollisonsAndThrowException = (state, code) => {
  if (
    isColliding(state.piece, state.board) ||
    displayCurrentGrid(state.piece) == undefined
  ) {
    const error = new Error(`Collision detected!`);
    error.code = code;
    throw error;
  }
  //se piece colide com board
  //se piece ta offboard
  //throw new Error(type);
};

export default function blocks(state: BlocksState = INITIAL_STATE, action): BlocksState {
  let pos_move;
  switch (action.type) {
    case 'piece/move-down':
      pos_move = {
        ...state,
        piece: { ...state.piece, y: state.piece.y + 1 },
      };
      testCollisonsAndThrowException(pos_move, 'piece-down-move-collision');
      return pos_move;
    default:
      return state;
  }
}
