import './App.css';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { checksCollision, transform, wrap } from './utils';

function App() {
  const [falling_piece, setFallingPiece]: [
    number[][],
    Dispatch<SetStateAction<number[][]>>,
  ] = useState([
    [0, 2, 2, 2, 0],
    [0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
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
  const current_board: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2],
    [0, 0, 0, 0, 1],
    [0, 2, 0, 0, 1],
    [0, 0, 0, 0, 1],
  ];
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
      const pos_move = transform(wrapped_piece, 0, 1);
      const colliding = checksCollision(pos_move, outer_walls);
      if (!colliding) {
        setFallingPiece((falling_piece) => transform(falling_piece, 0, 1));
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
