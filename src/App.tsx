import './App.css';

import { connect, useSelector } from 'react-redux';

import BoardContainer from './components/BoardContainer';
import GridView from './components/GridView';
import { emptyPiece, limitsPiece, randomPiece } from './factories/PieceFactory';

function App({ piece, board, limits }) {
  // randomPiece();
  // const board = emptyPiece();
  // const limits = limitsPiece();

  // handleTick = () => {
  //   //this.setState({ newTodoText: "" });
  // };

  // handlePlayerInput = (input) => {
  //   this.setState({ newTodoText: '' });
  // };

  return (
    <BoardContainer>
      <GridView grid={piece.currentGrid()}></GridView>
      <GridView grid={board.currentGrid()}></GridView>
      <GridView grid={limits.currentGrid()}></GridView>
    </BoardContainer>
  );
}
const mapStateToProps = (state) => ({
  piece: state.piece,
  board: state.board,
  limits: state.limits,
});

export default connect(mapStateToProps)(App);
