import { motion, Variants } from 'framer-motion';

import BlockFactory from '../factories/BlockFactory';
import styles from '../styles/blocks.module.css';
import { Block } from '../types';

type PieceViewProps = {
  piece: Block;
  section?: string;
};
const variants: Variants = {
  follow: (piece) => ({
    x: piece.x * (95 / 3),
    y: piece.y * (95 / 3),
    scaleX: 1,
    scaleY: 1,
  }),
  show: (piece) => ({
    scaleX: [0, 1],
    scaleY: [0, 1],
  }),
  biggerSplash: (piece) => ({
    scaleX: [1.1, 1],
  }),
  smallerSplash: (piece) => ({
    scaleX: [1.05, 1],
  }),
  static: (piece) => ({}),
};
const PieceView = ({ piece, section }: PieceViewProps) => {
  return (
    <>
      {piece && (
        <motion.table
          animate={piece.anim_state}
          custom={piece}
          variants={variants}
          className={styles.blockGroup}
        >
          <tbody>
            {piece.initial_grid[piece.rotations % piece.initial_grid.length].map(
              (row, i) => (
                <tr key={i}>
                  {row.map((block, j) => (
                    <BlockFactory key={j} type={block} section={section}></BlockFactory>
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
