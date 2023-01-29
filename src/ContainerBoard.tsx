import './App.css';

import { useAnimationControls } from 'framer-motion';
import { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';

import BoardContainer from './components/BoardContainer';
import GridView from './components/GridView';
import PieceView from './components/PieceView';
import { displayCurrentGrid, isEmptyPiece } from './controller';
import { Block, Grid } from './types';

type ContainerBoardProps = {
  piece: Block;
  board: Grid;
  limits: Grid;
  dispatch: Dispatch<any>;
};

function ContainerBoard({ blocks, ticks, dispatch }: ContainerBoardProps) {
  const isTimeToMoveDown = (ticks) => {
    return ticks % 10 == 0;
  };
  const pieceAnimationController = useAnimationControls();

  useEffect(() => {
    try {
      // if (existsMatch(board)) {
      //   dispatch({ type: 'board/combinations' });
      // }
      // if (existsFloatingBlocks(floating)) {
      //   dispatch({ type: 'floating/move-down' });
      // }
      if (isEmptyPiece(blocks.piece)) {
        dispatch({ type: 'piece/reset' });
        pieceAnimationController.set({
          x: 0,
          y: 0,
        });
        pieceAnimationController.start({
          scaleX: [0.5, 1.2, 1],
          scaleY: [0.5, 1.2, 1],
          transition: { duration: 0.3 },
        });
      }
      // const inputx = userController.getInputX();
      // const inputy = userController.getInputY();
      if (isTimeToMoveDown(ticks)) {
        dispatch({ type: 'piece/move-down' });
        pieceAnimationController.start({
          x: blocks.piece.x * (100 / 3),
          y: 34 + blocks.piece.y + blocks.piece.y * (100 / 3),
        });
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
          try {
            dispatch({ type: 'piece/join' });
          } catch (error) {
            dispatch({ type: 'blocks/reset' });
          }
          break;
        // case 'piece-side-move-collision':
        // case 'piece-rotate-move-collision':
        //   //add some feedback
        //   break;
        case 'piece-joinning-collides-or-undefined':
          break;
        default:
          throw error;
      }
    }
  }, [ticks]);

  return (
    <BoardContainer>
      <PieceView
        piece={blocks.piece}
        pieceAnimationController={pieceAnimationController}
      ></PieceView>
      {/* <GridView grid={displayCurrentGrid(blocks.piece)}></GridView> */}
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
