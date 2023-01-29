import { motion } from 'framer-motion';

import BlockFactory from '../factories/BlockFactory';
import styles from '../styles/blocks.module.css';
import { Block } from '../types';

type GridViewProps = {
  grid: number[][] | undefined;
};

const GridView = ({ grid }: GridViewProps) => {
  return (
    <>
      {grid && (
        <motion.table className={styles.blockGroup}>
          <tbody>
            {grid.map((row, i) => (
              <tr key={i}>
                {row.map((block, j) => (
                  <BlockFactory key={j} type={block}></BlockFactory>
                ))}
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </>
  );
};

export default GridView;
