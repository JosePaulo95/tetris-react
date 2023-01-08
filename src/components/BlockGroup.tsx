import styles from '../styles/blocks.module.css';

interface BlockGroupProps {
  shape: number[][];
  EmptyBlock?: any;
}

const BlockGroup = ({ shape, EmptyBlock }: BlockGroupProps) => {
  return (
    <table>
      <tbody className={styles.BlockGroup}>
        {shape.map((row, i) => (
          <tr key={i}>
            {row.map((block, j) =>
              block ? <td key={j} className={styles.block}></td> : EmptyBlock(),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlockGroup;
