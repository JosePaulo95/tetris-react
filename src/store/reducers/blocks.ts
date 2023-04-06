import {
  displayCurrentGrid,
  hasAnyCombinations,
  isColliding,
  join,
  removeMatches,
} from '../../controller';
import {
  emptyPiece,
  erasedPiece,
  limitsPiece,
  randomPiece,
} from '../../factories/PieceFactory';
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
    const error = new Error(code);
    error.code = code;
    throw error;
  }
  //se piece colide com board
  //se piece ta offboard
  //throw new Error(type);
};

export default function blocks(state: BlocksState = INITIAL_STATE, action): BlocksState {
  let pos_move, pos_join, board_pos_matches;
  const floating_blocks = [],
    matched_blocks = [];
  switch (action.type) {
    case 'piece/move-down':
      pos_move = {
        ...state,
        piece: { ...state.piece, y: state.piece.y + 1, anim_state: 'follow' },
      };
      testCollisonsAndThrowException(pos_move, 'piece-down-move-collision');
      return pos_move;
    case 'piece/move-right':
      pos_move = {
        ...state,
        piece: { ...state.piece, x: state.piece.x + 1, anim_state: 'follow' },
      };
      testCollisonsAndThrowException(pos_move, 'piece-side-move-collision');
      return pos_move;
    case 'piece/move-left':
      pos_move = {
        ...state,
        piece: { ...state.piece, x: state.piece.x - 1 },
      };
      testCollisonsAndThrowException(pos_move, 'piece-side-move-collision');
      return pos_move;
    case 'piece/rotate':
      pos_move = {
        ...state,
        piece: { ...state.piece, rotations: state.piece.rotations + 1 },
      };
      testCollisonsAndThrowException(pos_move, 'piece-rotation-move-collision');
      return pos_move;
    case 'piece/join':
      testCollisonsAndThrowException(state, 'piece-joinning-collides-or-undefined');
      return {
        ...state,
        board: join(displayCurrentGrid(state.piece)!, state.board),
        piece: erasedPiece(),
      };
    case 'piece/reset':
      return {
        ...state,
        piece: {
          ...randomPiece(),
        },
      };
    case 'board/combinations':
      // return state;
      //avisar cada bloco q ele sera eliminado para ativar a animação
      return {
        ...state,
        board: removeMatches(state.board),
      };
    case 'blocks/reset':
      return INITIAL_STATE;
    default:
      return state;
  }
}
