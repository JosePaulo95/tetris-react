import styles from '../styles/blocks.module.css';

const Shape = () => {
  return (
    <table>
      <tbody className={styles.shape}>
        <tr>
          <td className={styles.block}></td>
          <td className={styles.block}></td>
          <td className={styles.block}></td>
        </tr>
        <tr>
          <td className={styles.block}></td>
          <td className={styles.block}></td>
          <td className={styles.block}></td>
        </tr>
        <tr>
          <td className={styles.block}></td>
          <td className={styles.block}></td>
          <td className={styles.block}></td>
        </tr>
      </tbody>
    </table>
  );
};

export default Shape;
