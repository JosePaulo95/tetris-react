import './App.css';

import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';

import { willBottomCollide, willRotationCollide, willSideCollide } from './actions/moves';
import BoardContainer from './components/BoardContainer';
import BlockGroup from './components/GridView';
import { CLEAR_BOARD } from './constants';
import { clear, isColliding, join, removeMatches, transform } from './controller';
import { createBlock, randomPiece } from './factories/PieceFactory';
import { Block } from './types';

type NewType = {
  userController: {
    getInputX: () => any;
    getInputY: () => any;
  };
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

  const pieceReducer = (state: number, action: Action) => {
    switch (action.type) {
      case 'horizontal_move':
        return { ...state, x: state.x + action.payload.x };
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
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
    ],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      ticksDispatch({ type: 'increment' });
    }, 50);
    return () => clearInterval(interval);
  }, [ticks]);

  useEffect(() => {
    if (ticks % 2 == 0) {
      const inputx = userController.getInputX();
      if (inputx) {
        if (!willSideCollide(piece.display(), current_board.display(), inputx)) {
          piece.translate(inputx, 0);
        }
      }

      const inputy = userController.getInputY();
      if (inputy) {
        if (!willRotationCollide(piece, current_board)) {
          piece.rotate();
          //piece.translate(1, 0);
        }
      }
    }
  }, [ticks]);

  useEffect(() => {
    if (ticks % 2 == 1) {
      if (!willBottomCollide(piece.display(), current_board.display())) {
        piece.translate(0, 1);
      } else {
        const board_plus_piece = join(current_board.display(), piece.display());
        const board_after_matches = removeMatches(board_plus_piece);
        const game_over = isColliding(board_after_matches, outer_top);

        if (game_over) {
          current_board.resetGrid(CLEAR_BOARD.grid);
        } else {
          current_board.resetGrid(board_after_matches);
        }

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
    <BlockGroup grid={piece.display()}></BlockGroup>
    // <BoardContainer>
    //   <BlockGroup grid={current_board.display()}></BlockGroup>
    //   <BlockGroup grid={empty_board.display()}></BlockGroup>
    // </BoardContainer>
  );
}

export default App;
