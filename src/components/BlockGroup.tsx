import BlockFactory from '../factories/BlockFactory';
import styles from '../styles/blocks.module.css';
import { Block } from '../types';

type BlockGroupProps = {
  block: Block;
};

const BlockGroup = ({ block }: BlockGroupProps) => {
  return (
    <table className={styles.blockGroup}>
      <tbody>
        {block.display().map((row, i) => (
          <tr key={i}>
            {row.map((block, j) => (
              <BlockFactory key={j} type={block}></BlockFactory>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlockGroup;
