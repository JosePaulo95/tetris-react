import './App.css';

import { useReducer } from 'react';

import GridView from './components/GridView';
import { randomPiece } from './factories/PieceFactory';

function App() {
  const pieceReducer = (state: number, action: Action) => {
    return state;
  };
  // [PieceModel, Dispatch<PieceAction>]
  const piece = randomPiece();
  return <GridView grid={piece.currentGrid()}></GridView>;
}

export default App;
