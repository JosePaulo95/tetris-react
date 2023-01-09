import styles from '../styles/blocks.module.css';

interface BlockGroupProps {
  shape: number[][];
  Block?: any;
}

const BlockGroup = ({ shape, Block }: BlockGroupProps) => {
  return (
    <table>
      <tbody className={styles.BlockGroup}>
        {shape.map((row, i) => (
          <tr key={i}>
            {row.map((block, j) =>
              block ? (
                Block()
              ) : (
                <td key={j} className={`${styles.void_block} ${styles.block}`}></td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlockGroup;
