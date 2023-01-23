import './App.css';

import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';

import { willBottomCollide, willSideCollide } from './actions/moves';
import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { CLEAR_BOARD } from './constants';
import { randomPiece } from './factories/PieceFactory';
import { clear, isColliding, join, removeMatches, transform } from './utils';

type NewType = {
  userController: { popLastInput: () => any };
};

function App({ userController }: NewType) {
  type Action = {
    type: string;
  };

  const pieceReducer = (state: number[][], action: Action) => {
    console.log(action.type);
    switch (action.type) {
      case 'restart':
        return randomPiece();
      case 'down_move':
        return transform(state, 0, 1);
      case 'right_move':
        return transform(state, 1, 0);
      case 'left_move':
        return transform(state, -1, 0);
      default:
        return state;
    }
  };
  const tickReducer = (state: number, action: Action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      default:
        return state;
    }
  };
  const [ticks, ticksDispatch]: [number, Dispatch<Action>] = useReducer(tickReducer, 0);
  const [piece, dispatch]: [number[][], Dispatch<Action>] = useReducer(
    pieceReducer,
    randomPiece(),
  );

  const [current_board, setCurrentBoard]: [
    number[][],
    Dispatch<SetStateAction<number[][]>>,
  ] = useState(CLEAR_BOARD);
  const outer_top: number[][] = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const empty_board: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      ticksDispatch({ type: 'increment' });
    }, 50);
    return () => clearInterval(interval);
  }, [ticks]);

  useEffect(() => {
    if (ticks % 2 == 0) {
      const input = userController.popLastInput();
      if (input) {
        if (!willSideCollide(piece, current_board, input)) {
          dispatch({ type: input == -1 ? 'left_move' : 'right_move' });
        }
      }
    }
  }, [ticks]);

  useEffect(() => {
    if (ticks % 8 == 1) {
      if (!willBottomCollide(piece, current_board)) {
        dispatch({ type: 'down_move' });
      } else {
        const board_plus_piece = join(current_board, piece);
        const board_after_matches = removeMatches(board_plus_piece);
        const game_over = isColliding(board_after_matches, outer_top);

        if (game_over) {
          setCurrentBoard(clear(current_board));
        } else {
          setCurrentBoard(board_after_matches);
        }
        dispatch({ type: 'restart' });
      }
    }
  }, [ticks]);
  return (
    <BoardContainer>
      <BlockGroup grid={piece}></BlockGroup>
      <BlockGroup grid={current_board}></BlockGroup>
      <BlockGroup grid={empty_board}></BlockGroup>
    </BoardContainer>
  );
}

export default App;
