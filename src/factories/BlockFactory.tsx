import EmptyBlock from '../components/EmptyBlock';
import styles from '../styles/blocks.module.css';

interface BlockFactoryInterface {
  type: number;
}

const BlockFactory = (props: BlockFactoryInterface) => {
  switch (props.type) {
    case -1:
      return <EmptyBlock></EmptyBlock>;
    default:
      return <td className={`${styles.void_block} ${styles.block}`}></td>;
  }
};

export default BlockFactory;
