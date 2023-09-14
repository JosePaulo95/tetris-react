import { BoardState, getCurrentGrid, join, removeMatches } from '../../controller';
import { createParticles } from '../../factories/ParticlesData';
import {
  createPiece,
  emptyPiece,
  erasedPiece,
  limitsPiece,
  nextPiece,
  randomPiece,
} from '../../factories/PieceFactory';
import { Grid } from '../../types';
import { Block, BlocksState } from '../../types/block';
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
  joinning: erasedPiece(),
  floating: [],
  matching: [],
  particles: createParticles(),
};
const keys = { matching: 0, joinning: 0, particles: 0 };

export default function blocks(
  state: BlocksState = INITIAL_STATE,
  action: BlocksAction,
): BlocksState {
  let distance = 1;
  let floatingCopy: Block[],
    boardCopy,
    pieceCopy,
    matchingCopy: Block[],
    joinningCopy: Grid;
  let matchingRows;
  let grid_aux: Grid | undefined;
  switch (action.type) {
    case 'piece/move-down':
      if (state.floating.length > 0) {
        return state;
      }
      // grid_aux = getCurrentGrid(state.joinning);
      testDownCollision(state.piece, state.board);
      return {
        ...state,
        piece: { ...state.piece, y: state.piece.y + 1, anim_state: 'follow' },
      };
    case 'piece/move-down-max':
      if (state.floating.length > 0) {
        return state;
      }
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
      pieceCopy = testRotationCollision(state.piece, state.board);
      return {
        ...state,
        piece: pieceCopy,
      };
    case 'piece/join':
      grid_aux = getCurrentGrid(state.piece);
      if (grid_aux) {
        pieceCopy = {
          ...createPiece([grid_aux]),
          anim_state: 'biggerSplash',
          key: keys.joinning++,
        } as Block;
        return {
          ...state,
          joinning: pieceCopy,
          board: join(grid_aux, state.board),
          piece: erasedPiece(),
        };
      }
      return state;
    case 'floating/join':
      floatingCopy = state.floating.slice();
      floatingCopy.splice(action.payload, 1);
      grid_aux = getCurrentGrid(state.floating[action.payload]);
      if (grid_aux) {
        pieceCopy = {
          ...createPiece([grid_aux]),
          anim_state: 'biggerSplash',
          key: keys.joinning++,
        } as Block;
        return {
          ...state,
          joinning: pieceCopy,
          board: join(grid_aux, state.board),
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
      ({
        remaining: boardCopy,
        floating: floatingCopy,
        matching: matchingCopy,
      } = removeMatches(state.board) as BoardState);
      matchingRows = matchingCopy.map((i) => ({
        ...i,
        anim_state: 'match',
        key: keys.matching++,
      }));

      return {
        ...state,
        board: boardCopy,
        joinning: erasedPiece(),
        floating: floatingCopy,
        matching: matchingRows,
        particles: {
          ...state.particles,
          key: keys.particles++,
          initial_grid: matchingCopy[0].initial_grid.map((grid) =>
            grid.map((row, row_index) =>
              row.map((cell, cell_index) => (cell > 0 ? 100 : 0)),
            ),
          ),
        },
      };
    case 'blocks/reset':
      return { ...INITIAL_STATE, piece: randomPiece() };
    case 'floating/fall':
      for (let i = 0; i < state.floating.length; i++) {
        testFloatingFallCollision(state.floating[i], state.board, state.limits, i);
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
