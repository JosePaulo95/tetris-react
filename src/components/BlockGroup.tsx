import styles from '../styles/blocks.module.css';

interface BlockGroupProps {
  shape: number[][];
}

const BlockGroup = ({ shape }: BlockGroupProps) => {
  return (
    <table>
      <tbody className={styles.BlockGroup}>
        {shape.map((row, i) => (
          <tr key={i}>
            {row.map((block, j) =>
              block ? <td key={j} className={styles.block}></td> : <></>,
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlockGroup;
