import Block from '../components/Block';
import EmptyBlock from '../components/EmptyBlock';
import styles from '../styles/blocks.module.css';

interface BlockFactoryInterface {
  type: number;
}

const BlockFactory = (props: BlockFactoryInterface) => {
  switch (props.type) {
    case -1:
      return <EmptyBlock></EmptyBlock>;
    case 0:
      return <td className={`${styles.void_block} ${styles.block}`}></td>;
    default:
      return <Block type={props.type} />;
  }
};

export default BlockFactory;
