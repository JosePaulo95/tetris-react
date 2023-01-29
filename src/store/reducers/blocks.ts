import { displayCurrentGrid, isColliding, join } from '../../controller';
import { emptyPiece, limitsPiece, randomPiece } from '../../factories/PieceFactory';
import { Block, Grid } from '../../types';

type BlocksState = {
  piece: Block;
  board: Grid;
  limits: Grid;
};

const INITIAL_STATE = {
  piece: randomPiece(),
  board: emptyPiece(),
  limits: limitsPiece(),
};

const testCollisonsAndThrowException = (state, code) => {
  const grid_pos_move = displayCurrentGrid(state.piece);
  if (grid_pos_move == undefined || isColliding(grid_pos_move, state.board)) {
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
    case 'piece/join':
      return {
        ...state,
        piece: randomPiece(),
      };
    default:
      return state;
  }
}
