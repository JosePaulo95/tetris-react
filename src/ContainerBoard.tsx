import './App.css';

import { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';

import BoardContainer from './components/BoardContainer';
import GridView from './components/GridView';
import { displayCurrentGrid } from './controller';
import { Block } from './types';

type ContainerBoardProps = {
  piece: Block;
  board: Block;
  limits: Block;
  dispatch: Dispatch<any>;
};

function ContainerBoard({ blocks, ticks, dispatch }: ContainerBoardProps) {
  const isTimeToMoveDown = (ticks) => {
    return ticks % 10 == 0;
  };

  useEffect(() => {
    try {
      // if (existsMatch(board)) {
      //   dispatch({ type: 'board/combinations' });
      // }
      // if (existsFloatingBlocks(floating)) {
      //   dispatch({ type: 'floating/move-down' });
      // }
      // const inputx = userController.getInputX();
      // const inputy = userController.getInputY();
      if (isTimeToMoveDown(ticks)) {
        dispatch({ type: 'piece/move-down' });
      }
      // if (inputx > 0) {
      //   dispatch({ type: 'piece/move-right' });
      // }
      // if (inputx < 0) {
      //   dispatch({ type: 'piece/move-left' });
      // }
      // if (inputy > 0) {
      //   dispatch({ type: 'piece/rotate' });
      // }
      // if (inputy < 0) {
      //   dispatch({ type: 'piece/move-down-infinity' });
      // }
    } catch (error) {
      console.log(error);

      switch (error.code) {
        // case 'remaining-floating-blocks':
        //   //do nothing but waits next tick
        //   break;
        // case 'floating-down-move-collision':
        //   dispatch({ type: 'floating/join' });
        //   break;
        case 'piece-down-move-collision':
          dispatch({ type: 'pieces/join' });
          break;
        // case 'piece-side-move-collision':
        // case 'piece-rotate-move-collision':
        //   //add some feedback
        //   break;
        // case 'board-breaks-top-limit':
        //   gameOver();
        //   break;
        default:
          throw error;
      }
    }
  }, [ticks]);

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
