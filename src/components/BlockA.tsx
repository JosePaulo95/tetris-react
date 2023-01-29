import { motion } from 'framer-motion';

import styles from '../styles/blocks.module.css';

const BlockA = () => {
  return <motion.td className={`${styles.block_a} ${styles.block}`}></motion.td>;
};

export default BlockA;
