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
    default:
      return styles.block_d;
  }
};

const Block = ({ type }: { type: number }) => {
  return <motion.td className={`${mapClass(type)} ${styles.block}`}></motion.td>;
};

export default Block;
