import './App.css';

import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';

import { willBottomCollide, willSideCollide } from './actions/moves';
import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { CLEAR_BOARD } from './constants';
import { randomPiece } from './factories/PieceFactory';
import { clear, isColliding, join, removeMatches, transform } from './utils';

function App() {
  type PieceAction = {
    type: string;
  };

  const pieceReducer = (state: number[][], action: PieceAction) => {
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
  const [piece, dispatch]: [number[][], Dispatch<PieceAction>] = useReducer(
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
      const input = -1;
      if (willSideCollide(piece, current_board, input)) {
        return;
      }
      dispatch({ type: 'side_move' });
    }, 400);
    return () => clearInterval(interval);
  }, [piece]);

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 500);
    return () => clearInterval(interval);
  }, [piece]);
  return (
    <BoardContainer>
      <BlockGroup grid={piece}></BlockGroup>
      <BlockGroup grid={current_board}></BlockGroup>
      <BlockGroup grid={empty_board}></BlockGroup>
    </BoardContainer>
  );
}

export default App;
