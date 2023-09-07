import { motion } from 'framer-motion';

import styles from '../styles/blocks.module.css';

const mapClass = (type: number) => {
  switch (type) {
    case 1:
      return styles.block_a;
    case 2:
      return styles.block_b;
    case 3:
      return styles.block_c;
    case 4:
      return styles.block_d;
    case 5:
      return styles.block_T;
    default:
      return styles.block_white;
  }
};

const Block = ({ type, section }: { type: number; section?: string }) => {
  return (
    <motion.td className={`${mapClass(type)} ${styles.block}`}>
      {(section === 'front' || !section) && <div className={styles.front}></div>}
      {(section === 'sides' || !section) && <div className={styles.side}></div>}
    </motion.td>
  );
};

export default Block;
