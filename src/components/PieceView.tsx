import { motion } from 'framer-motion';

import BlockFactory from '../factories/BlockFactory';
import styles from '../styles/blocks.module.css';
import { Block } from '../types';

type PieceViewProps = {
  piece: Block;
  pieceAnimationController: any;
};

const PieceView = ({ piece, pieceAnimationController }: PieceViewProps) => {
  return (
    <>
      {piece && (
        <motion.table animate={pieceAnimationController} className={styles.blockGroup}>
          <tbody>
            {piece.initial_grid[piece.rotations % piece.initial_grid.length].map(
              (row, i) => (
                <tr key={i}>
                  {row.map((block, j) => (
                    <BlockFactory key={j} type={block ? block + 1 : 0}></BlockFactory>
                  ))}
                </tr>
              ),
            )}
          </tbody>
        </motion.table>
      )}
    </>
  );
};

export default PieceView;
