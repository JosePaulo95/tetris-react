import './App.css';

import { useReducer } from 'react';

import BoardContainer from './components/BoardContainer';
import GridView from './components/GridView';
import { emptyPiece, limitsPiece, randomPiece } from './factories/PieceFactory';

function App() {
  // [PieceModel, Dispatch<PieceAction>]
  const piece = randomPiece();
  const board = emptyPiece();
  const limits = limitsPiece();
  return (
    <BoardContainer>
      <GridView grid={piece.currentGrid()}></GridView>
      <GridView grid={board.currentGrid()}></GridView>
      <GridView grid={limits.currentGrid()}></GridView>
    </BoardContainer>
  );
}

export default App;
