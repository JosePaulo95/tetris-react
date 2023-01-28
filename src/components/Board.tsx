import './App.css';

import { emptyPiece, limitsPiece, randomPiece } from '../factories/PieceFactory';
import BoardContainer from './BoardContainer';
import GridView from './GridView';

function App() {
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
