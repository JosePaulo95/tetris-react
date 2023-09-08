import { motion, Variants } from 'framer-motion';

import BlockFactory from '../factories/BlockFactory';
import styles from '../styles/blocks.module.css';
import { Block } from '../types';

type PieceViewProps = {
  piece: Block;
  section?: string;
};

const initialFrom = (anim_state: string) => {
  if (anim_state == 'biggerSplash') {
    return {
      scaleX: 1.06,
    };
  }
  return {};
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
    // scaleY: [0.5, 1],
    scaleX: [0.94, 1.06],
    // ease: 'easeIn',
  }),
  smallerSplash: (piece) => ({
    scaleX: [5],
  }),
  match: (piece) => ({
    // scaleY: [1, 0],
    // opacity: [0.3, 0.3],
  }),
  static: (piece) => ({}),
};
const PieceView = ({ piece, section }: PieceViewProps) => {
  return (
    <>
      {piece && (
        <motion.table
          initial={initialFrom(piece.anim_state)}
          // transition={{ duration: piece.anim_state == 'biggerSplash' ? 1 : 0.2 }}
          animate={piece.anim_state}
          custom={piece}
          variants={variants}
          className={styles.blockGroup}
          key={piece.key}
        >
          <tbody>
            {piece.initial_grid[piece.rotations % piece.initial_grid.length].map(
              (row, i) => (
                <tr key={i}>
                  {row.map((block, j) => (
                    <BlockFactory
                      key={j}
                      type={block}
                      section={section}
                      anim={piece.anim_state}
                      anim_delay={0.05 * j}
                    ></BlockFactory>
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
