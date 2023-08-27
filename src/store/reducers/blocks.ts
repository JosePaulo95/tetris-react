import { BoardState, getCurrentGrid, join, removeMatches } from '../../controller';
import {
  emptyPiece,
  erasedPiece,
  limitsPiece,
  nextPiece,
  randomPiece,
} from '../../factories/PieceFactory';
import { BlocksState } from '../../types/block';
import { BlocksAction } from '../actions/blocks';
import {
  testDownCollision,
  testFloatingFallCollision,
  testJoinCollision,
  testRotationCollision,
  testSideCollision,
} from './collision';

const INITIAL_STATE: BlocksState = {
  piece: randomPiece(),
  board: emptyPiece(),
  limits: limitsPiece(),
  floating: [],
};

export default function blocks(
  state: BlocksState = INITIAL_STATE,
  action: BlocksAction,
): BlocksState {
  let distance = 1;
  let floatingCopy, boardCopy, pieceCopy;
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
      pieceCopy = getCurrentGrid(state.piece);
      if (pieceCopy) {
        return {
          ...state,
          board: join(pieceCopy, state.board),
          piece: erasedPiece(),
        };
      }
      return state;
    case 'floating/join':
      floatingCopy = state.floating.slice();
      floatingCopy.splice(action.payload, 1);
      pieceCopy = getCurrentGrid(state.floating[action.payload]);
      if (pieceCopy) {
        return {
          ...state,
          board: join(pieceCopy, state.board),
          floating: floatingCopy,
        };
      }
      return state;
    case 'piece/reset':
      testJoinCollision(state.board, state.limits);
      return {
        ...state,
        piece: {
          ...nextPiece(state),
        },
      };
    case 'board/combinations':
      // bug cascata buga
      // return state;
      //avisar cada bloco q ele sera eliminado para ativar a animação
      ({ remaining: boardCopy, floating: floatingCopy } = removeMatches(
        state.board,
      ) as BoardState);
      return {
        ...state,
        board: boardCopy,
        floating: floatingCopy,
      };
    case 'blocks/reset':
      return INITIAL_STATE;
    case 'floating/fall':
      for (let i = 0; i < state.floating.length; i++) {
        testFloatingFallCollision(state.floating[i], state.board, i);
      }

      return {
        ...state,
        floating: state.floating.map((i) => {
          return {
            ...i,
            y: i.y + 1,
          };
        }),
      };
    default:
      return state;
  }
}
