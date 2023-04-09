import {
  displayCurrentGrid,
  join,
  removeMatches,
  removeMatchesMoveDownBlocks,
} from '../../controller';
import {
  auxPieces,
  emptyPiece,
  emptyPiece1,
  erasedPiece,
  limitsPiece,
  randomPiece,
} from '../../factories/PieceFactory';
import { Block, Grid } from '../../types';
import {
  testDownCollision,
  testFloatingFallCollision,
  testJoinCollision,
  testRotationCollision,
  testSideCollision,
} from './collision';

type BlocksState = {
  piece: Block;
  board: Grid;
  limits: Grid;
  floating: Block[];
};

const INITIAL_STATE: BlocksState = {
  piece: randomPiece(),
  board: emptyPiece(),
  limits: limitsPiece(),
  floating: [],
};

export default function blocks(state: BlocksState = INITIAL_STATE, action): BlocksState {
  let distance = 1;
  let floatingCopy;
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
      return {
        ...state,
        board: join(displayCurrentGrid(state.piece)!, state.board),
        piece: erasedPiece(),
      };
    case 'floating/join':
      floatingCopy = state.floating.slice();
      floatingCopy.splice(action.payload, 1);
      return {
        ...state,
        board: join(displayCurrentGrid(state.floating[action.payload])!, state.board),
        floating: floatingCopy,
      };
    case 'piece/reset':
      testJoinCollision(state.board, state.limits);
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
        board: removeMatchesMoveDownBlocks(state.board),
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
function floatingFallCollision(arg0: Block, board: Grid, i: number) {
  throw new Error('Function not implemented.');
}
