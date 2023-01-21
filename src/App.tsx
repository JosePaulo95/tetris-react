import './App.css';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { randomPiece } from './factories/PieceFactory';
import { isColliding, join, removeMatches, transform, wrap } from './utils';

function App() {
  const [piece, setPiece]: [number[][], Dispatch<SetStateAction<number[][]>>] = useState(
    randomPiece(),
  );
  const outer_bottom: number[][] = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  const [current_board, setCurrentBoard]: [
    number[][],
    Dispatch<SetStateAction<number[][]>>,
  ] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
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
      const wrapped_piece = wrap(piece);
      const wrapped_pos_down_move = transform(wrapped_piece, 0, 1);
      const piece_pos_down_move = transform(piece, 0, 1);
      const will_ground_collide = isColliding(wrapped_pos_down_move, outer_bottom);
      const will_board_collide = isColliding(piece_pos_down_move, current_board);

      if (will_ground_collide || will_board_collide) {
        const board_plus_piece = join(current_board, piece);
        const board_after_matches = removeMatches(board_plus_piece);
        const game_over = isColliding(board_after_matches, outer_top);

        if (game_over) {
          setCurrentBoard([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ]);
        } else {
          setCurrentBoard(board_after_matches);
        }
        setPiece(randomPiece());
      } else {
        setPiece(piece_pos_down_move);
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
