import './App.css';

import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';

import { willBottomCollide, willSideCollide } from './actions/moves';
import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { CLEAR_BOARD } from './constants';
import { createBlock, randomPiece } from './factories/PieceFactory';
import { Block } from './types';
import { clear, isColliding, join, removeMatches, transform } from './utils';

type NewType = {
  userController: { popLastInput: () => any };
};

function App({ userController }: NewType) {
  type Action = {
    type: string;
  };

  const pieceReducer = (state: Block, action: Action) => {
    console.log(action.type);
    switch (action.type) {
      case 'restart':
        return randomPiece();
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
  const [piece, dispatch]: [Block, Dispatch<Action>] = useReducer(
    pieceReducer,
    randomPiece(),
  );

  const [current_board, setCurrentBoard]: [Block, Dispatch<SetStateAction<Block>>] =
    useState(CLEAR_BOARD);
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
  const empty_board: Block = createBlock([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]);

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
        if (!willSideCollide(piece.display(), current_board.display(), input)) {
          //dispatch({ type: input == -1 ? 'left_move' : 'right_move' });
          piece.translate(input, 0);
        }
      }
    }
  }, [ticks]);

  useEffect(() => {
    if (ticks % 8 == 1) {
      if (!willBottomCollide(piece.display(), current_board.display())) {
        // dispatch({ type: 'down_move' });
        piece.translate(0, 1);
        console.log(piece);
      } else {
        const board_plus_piece = join(current_board.display(), piece.display());
        const board_after_matches = removeMatches(board_plus_piece);
        const game_over = isColliding(board_after_matches, outer_top);

        if (game_over) {
          setCurrentBoard(CLEAR_BOARD);
        } else {
          //setCurrentBoard(board_after_matches);
        }
        dispatch({ type: 'restart' });
      }
    }
  }, [ticks]);
  return (
    <BoardContainer>
      <BlockGroup block={piece}></BlockGroup>
      <BlockGroup block={current_board}></BlockGroup>
      <BlockGroup block={empty_board}></BlockGroup>
    </BoardContainer>
  );
}

export default App;
