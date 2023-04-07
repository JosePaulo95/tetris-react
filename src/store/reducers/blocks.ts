import { displayCurrentGrid, join, removeMatches } from '../../controller';
import {
  emptyPiece,
  erasedPiece,
  limitsPiece,
  randomPiece,
} from '../../factories/PieceFactory';
import { Block, Grid } from '../../types';
import {
  testDownCollision,
  testJoinCollision,
  testRotationCollision,
  testSideCollision,
} from './collision';

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

export default function blocks(state: BlocksState = INITIAL_STATE, action): BlocksState {
  let distance = 1;
  switch (action.type) {
    case 'piece/move-down':
      testDownCollision(state.piece, state.board);
      return {
        ...state,
        piece: { ...state.piece, y: state.piece.y + 1, anim_state: 'follow' },
      };
    case 'piece/move-down-max':
      distance = 0;
      // eslint-disable-next-line no-constant-condition
      for (let i = 0; i < 20; i++) {
        try {
          testDownCollision({ ...state.piece, y: state.piece.y + distance }, state.board);
          distance++;
        } catch (error) {
          break;
        }
      }
      return {
        ...state,
        piece: { ...state.piece, y: state.piece.y + distance, anim_state: 'follow' },
      };
    case 'piece/move-right':
      testSideCollision(state.piece, state.board, 1);
      return {
        ...state,
        piece: { ...state.piece, x: state.piece.x + 1, anim_state: 'follow' },
      };
    case 'piece/move-left':
      testSideCollision(state.piece, state.board, -1);
      return {
        ...state,
        piece: { ...state.piece, x: state.piece.x - 1 },
      };
    case 'piece/rotate':
      testRotationCollision(state.piece, state.board);
      return {
        ...state,
        piece: { ...state.piece, rotations: state.piece.rotations + 1 },
      };
    case 'piece/join':
      testJoinCollision(state.piece, state.limits);
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
