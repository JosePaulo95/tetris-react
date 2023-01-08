import styles from '../styles/blocks.module.css';

const EmptyBlock = () => {
  return <td className={`${styles.empty_block} ${styles.block}`}></td>;
};

export default EmptyBlock;
