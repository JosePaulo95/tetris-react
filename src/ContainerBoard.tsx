import './App.css';

import { Dispatch, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import BoardContainer from './components/BoardContainer';
import GridView from './components/GridView';
import { displayCurrentGrid } from './controller';
import { emptyPiece, limitsPiece, randomPiece } from './factories/PieceFactory';
import { rightMove } from './store/actions/blocks';
import { Block } from './types';

type ContainerBoardProps = {
  piece: Block;
  board: Block;
  limits: Block;
  dispatch: Dispatch<any>;
};

function ContainerBoard({ blocks, ticks, dispatch }: ContainerBoardProps) {
  useEffect(() => {
    try {
      dispatch({ type: 'piece/move-down' });
    } catch (error) {
      console.log('pegou o erro');
      console.log(error);
    }
  }, [ticks]);
  // randomPiece();
  // const board = emptyPiece();
  // const limits = limitsPiece();

  // handleTick = () => {
  //   //this.setState({ newTodoText: "" });
  // };

  // handlePlayerInput = (input) => {
  // };
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
  ticks: state.ticks,
});

export default connect(mapStateToProps)(ContainerBoard);
