import './App.css';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { randomPiece } from './factories/PieceFactory';
import { isColliding, join, removeMatches, transform, wrap } from './utils';

function App() {
  const [falling_piece, setFallingPiece]: [
    number[][],
    Dispatch<SetStateAction<number[][]>>,
  ] = useState(randomPiece());
  const outer_walls: number[][] = [
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
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
      const wrapped_piece = wrap(falling_piece);
      const wrapped_pos_move = transform(wrapped_piece, 0, 1);
      const ground_colliding = isColliding(wrapped_pos_move, outer_walls);
      const pos_move = transform(falling_piece, 0, 1);
      const current_board_colliding = isColliding(pos_move, current_board);

      if (ground_colliding || current_board_colliding) {
        const post_move = join(current_board, falling_piece);
        const post_matches = removeMatches(post_move);
        const game_over = isColliding(post_matches, outer_top);

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
          setCurrentBoard(post_matches);
        }
        setFallingPiece(randomPiece());
      } else {
        setFallingPiece(pos_move);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [falling_piece]);
  return (
    <BoardContainer>
      <BlockGroup grid={falling_piece}></BlockGroup>
      <BlockGroup grid={current_board}></BlockGroup>
      <BlockGroup grid={empty_board}></BlockGroup>
    </BoardContainer>
  );
}

export default App;
