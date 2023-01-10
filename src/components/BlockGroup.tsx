import BlockFactory from '../factories/BlockFactory';
import styles from '../styles/blocks.module.css';

interface BlockGroupProps {
  grid: number[][];
}

const BlockGroup = ({ grid }: BlockGroupProps) => {
  return (
    <table>
      <tbody className={styles.BlockGroup}>
        {grid.map((row, i) => (
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
