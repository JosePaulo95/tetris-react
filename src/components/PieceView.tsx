import { motion } from 'framer-motion';

import BlockFactory from '../factories/BlockFactory';
import styles from '../styles/blocks.module.css';
import { Block } from '../types';

type PieceViewProps = {
  piece: Block;
};

const PieceView = ({ piece }: PieceViewProps) => {
  return (
    <>
      {piece && (
        <motion.table
          animate={{ x: piece.x * (100 / 3), y: piece.y * (100 / 3) }}
          className={styles.blockGroup}
        >
          <tbody>
            {piece.initial_grid[piece.rotations % piece.initial_grid.length].map(
              (row, i) => (
                <tr key={i}>
                  {row.map((block, j) => (
                    <BlockFactory key={j} type={block}></BlockFactory>
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
