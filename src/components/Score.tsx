import styles from '../styles/score.module.css';

type ScoreProps = {
  current: number;
};

const Score = ({ current }: ScoreProps) => {
  return <span className={styles.scoreValue}>{current}</span>;
};

export default Score;
