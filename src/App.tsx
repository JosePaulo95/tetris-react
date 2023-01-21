import './App.css';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { applyDownMove, willBottomCollide } from './actions/moves';
import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { CLEAR_BOARD } from './constants';
import { randomPiece } from './factories/PieceFactory';
import { clear, isColliding, join, removeMatches } from './utils';

function App() {
  const [piece, setPiece]: [number[][], Dispatch<SetStateAction<number[][]>>] = useState(
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
      if (!willBottomCollide(piece, current_board)) {
        const down_move = applyDownMove(piece, current_board);
        setPiece(down_move);
      } else {
        const board_plus_piece = join(current_board, piece);
        const board_after_matches = removeMatches(board_plus_piece);
        const game_over = isColliding(board_after_matches, outer_top);

        if (game_over) {
          setCurrentBoard(clear(current_board));
        } else {
          setCurrentBoard(board_after_matches);
        }
        setPiece(randomPiece());
      }
    }, 50);
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
