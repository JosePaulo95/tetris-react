import './App.css';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import BlockGroup from './components/BlockGroup';
import BoardContainer from './components/BoardContainer';
import { transform } from './utils';

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
    [1, 0, 0, 0, 0],
  ]);
  const current_board: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2],
    [0, 0, 3, 0, 1],
    [0, 2, 2, 0, 1],
    [1, 1, 2, 0, 1],
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
    setInterval(() => {
      setFallingPiece((falling_piece) => transform(falling_piece, 0, 1));
    }, 1000);
  }, []);
  return (
    <BoardContainer>
      <BlockGroup grid={falling_piece}></BlockGroup>
      <BlockGroup grid={current_board}></BlockGroup>
      <BlockGroup grid={empty_board}></BlockGroup>
    </BoardContainer>
  );
}

export default App;
