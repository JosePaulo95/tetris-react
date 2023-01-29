import { useAnimationControls } from 'framer-motion';
import { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';

import { pieceAnimationController } from '../animations/piece';
import BoardContainer from '../components/BoardContainer';
import GridView from '../components/GridView';
import PieceView from '../components/PieceView';
import { displayCurrentGrid, isEmptyPiece } from '../controller';
// import { keyboardInput, userController } from '../input/keyboardInput';
import { Block, Grid } from '../types';

type ContainerBoardProps = {
  piece: Block;
  board: Grid;
  limits: Grid;
  dispatch: Dispatch<any>;
};

import { userController } from '../input/keyboardInput';

function ContainerBoard({ blocks, ticks, dispatch }: ContainerBoardProps) {
  const isTimeToMoveDown = (ticks) => {
    return ticks % 10 == 0;
  };
  const anim = pieceAnimationController(blocks.piece);

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
        anim.reset();
        anim.start('show');
      }
      // console.log(inputx);
      //const inputy = userController.getInputY();
      if (isTimeToMoveDown(ticks)) {
        dispatch({ type: 'piece/move-down' });
        anim.start('follow');
      }

      const inputx = userController.current_input_x;

      if (inputx && inputx > 0) {
        dispatch({ type: 'piece/move-right' });
        anim.start('follow');
      }
      if (inputx && inputx < 0) {
        dispatch({ type: 'piece/move-left' });
        anim.start('follow');
      }

      //anim.start('follow');

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
        case 'piece-side-move-collision':
          // case 'piece-rotate-move-collision':
          //   //add some feedback
          break;
        case 'piece-joinning-collides-or-undefined':
          break;
        default:
          throw error;
      }
    }
  }, [ticks]);

  return (
    <BoardContainer>
      {/* <PieceView
        piece={blocks.piece}
        pieceAnimationController={anim.controller}
      ></PieceView> */}
      <GridView grid={displayCurrentGrid(blocks.piece)}></GridView>
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
