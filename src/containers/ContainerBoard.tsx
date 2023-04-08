import { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';

import BoardContainer from '../components/BoardContainer';
import GridView from '../components/GridView';
import PieceView from '../components/PieceView';
import {
  asyncHandleMatches,
  handleCollision,
  handlePieceGoingDown,
  handleResetPiece,
  handleUserInput,
} from '../handlers';
import { userController } from '../input/keyboardInput';
import { Block, Grid } from '../types';

type ContainerBoardProps = {
  piece: Block;
  board: Grid;
  limits: Grid;
  dispatch: Dispatch<any>;
};

function ContainerBoard({ blocks, ticks, dispatch }: ContainerBoardProps) {
  useEffect(() => {
    asyncHandleMatches(blocks, ticks, dispatch)
      .then(() => {
        handleResetPiece(blocks, dispatch);
        handlePieceGoingDown(blocks, ticks, dispatch);
        handleUserInput(
          userController.current_input_x,
          userController.current_input_y,
          dispatch,
        );
      })
      .catch((collision) => {
        handleCollision(collision as Error, dispatch);
      });
  }, [ticks]);

  return (
    <BoardContainer>
      <PieceView piece={blocks.piece}></PieceView>
      {/* <GridView grid={displayCurrentGrid(blocks.piece)}></GridView> isso aqui mostra grid do dados ajuda a debugar*/}
      <GridView grid={blocks.board}></GridView>
      <GridView grid={blocks.limits}></GridView>
    </BoardContainer>
  );
}
const mapStateToProps = (state) => ({
  blocks: state.blocks,
  ticks: state.ticks,
});

export default connect(mapStateToProps)(ContainerBoard);
