import styles from '../styles/blocks.module.css';
import EmptyBlock from './EmptyBlock';

interface BlockGroupProps {
  grid: number[][];
}

const BlockGroup = ({ grid }: BlockGroupProps) => {
  return (
    <table>
      <tbody className={styles.BlockGroup}>
        {grid.map((row, i) => (
          <tr key={i}>
            {row.map((block, j) => {
              switch (block) {
                case -1:
                  return EmptyBlock();
                default:
                  return (
                    <td key={j} className={`${styles.void_block} ${styles.block}`}></td>
                  );
                  break;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlockGroup;
