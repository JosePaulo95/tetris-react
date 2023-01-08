import styles from '../styles/blocks.module.css';

const BlockGroup = () => {
  const shape = [
    [1, 0],
    [1, 1],
  ];

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
