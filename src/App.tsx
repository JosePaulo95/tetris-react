import './App.css';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { randomPiece } from './factories/PieceFactory';
import { isColliding, join, transform, wrap } from './utils';

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
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 3],
    [0, 3, 0, 0, 0],
  ]);
  const empty_board: number[][] = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
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
        setCurrentBoard(join(current_board, falling_piece));
        setFallingPiece(randomPiece());
        //instantiateNewPiece()
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
