import { ReactElement } from 'react';

import styles from '../styles/score.module.css';

type Props = {
  children: ReactElement[];
};

const ScoreContainer = ({ children }: Props) => {
  return <div className={styles.scoreContainer}>{children}</div>;
};

export default ScoreContainer;
