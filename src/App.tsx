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

  const tickReducer = (state: number, action: Action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      default:
        return state;
    }
  };
  const [ticks, ticksDispatch]: [number, Dispatch<Action>] = useReducer(tickReducer, 0);
  const [piece] = useState(randomPiece());
  const [current_board] = useState(CLEAR_BOARD);
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
    }, 1000);
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
    if (ticks % 2 == 1) {
      if (!willBottomCollide(piece.display(), current_board.display())) {
        //dispatch({ type: 'move', x: 0, y: 1 });
        piece.translate(0, 1);
      } else {
        const board_plus_piece = join(current_board.display(), piece.display());
        const board_after_matches = removeMatches(board_plus_piece);
        const game_over = isColliding(board_after_matches, outer_top);

        if (game_over) {
          current_board.resetGrid(CLEAR_BOARD.grid);
          //setCurrentBoard(CLEAR_BOARD);
        } else {
          current_board.resetGrid(board_after_matches);
          //setCurrentBoard(board_after_matches);
        }
        //dispatch({ type: 'restart', x: 0, y: 0 });

        piece.resetGrid([
          [0, 1, 1, 0, 0],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);
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
