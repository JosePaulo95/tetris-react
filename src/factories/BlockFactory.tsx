import BlockA from '../components/BlockA';
import BlockB from '../components/BlockB';
import BlockC from '../components/BlockC';
import BlockD from '../components/BlockD';
import EmptyBlock from '../components/EmptyBlock';
import styles from '../styles/blocks.module.css';

interface BlockFactoryInterface {
  type: number;
}

const BlockFactory = (props: BlockFactoryInterface) => {
  switch (props.type) {
    case -1:
      return <EmptyBlock></EmptyBlock>;
    case 1:
      return <BlockA />;
    case 2:
      return <BlockB />;
    case 3:
      return <BlockC />;
    case 4:
      return <BlockD />;
    default:
      return <td className={`${styles.void_block} ${styles.block}`}></td>;
  }
};

export default BlockFactory;
