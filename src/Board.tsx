import './App.css';

import { Dispatch } from 'react';
import { connect, useSelector } from 'react-redux';

import BoardContainer from './components/BoardContainer';
import GridView from './components/GridView';
import { displayCurrentGrid } from './controller';
import { emptyPiece, limitsPiece, randomPiece } from './factories/PieceFactory';
import { rightMove } from './store/actions';
import { Block } from './types';

type BoardProps = {
  piece: Block;
  board: Block;
  limits: Block;
  dispatch: Dispatch<any>;
};

function Board({ blocks, dispatch }: BoardProps) {
  // randomPiece();
  // const board = emptyPiece();
  // const limits = limitsPiece();

  // handleTick = () => {
  //   //this.setState({ newTodoText: "" });
  // };

  // handlePlayerInput = (input) => {
  // };
  //dispatch(rightMove());
  //console.log();

  return (
    <BoardContainer>
      <GridView grid={displayCurrentGrid(blocks.piece)}></GridView>
      <GridView grid={displayCurrentGrid(blocks.board)}></GridView>
      <GridView grid={displayCurrentGrid(blocks.limits)}></GridView>
    </BoardContainer>
  );
}
const mapStateToProps = (state) => ({
  blocks: state.blocks,
});

export default connect(mapStateToProps)(Board);
