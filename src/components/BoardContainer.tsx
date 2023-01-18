import { Children, ReactElement } from 'react';

import styles from '../styles/blocks.module.css';

type Props = {
  children: ReactElement[];
};

const BoardContainer = ({ children }: Props) => {
  return <div className={styles.boardContainer}>{children}</div>;
};

export default BoardContainer;
