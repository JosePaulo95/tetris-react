import { connect, ConnectedProps } from 'react-redux';

import Score from '../components/Score';
import ScoreContainer from '../components/ScoreContainer';
import styles from '../styles/score.module.css';

type RootState = {
  score: number;
};

const mapStateToProps = (state: RootState): RootState => ({
  score: state.score,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ContainerAudioProps = PropsFromRedux;

function ContainerScore({ score, dispatch }: ContainerAudioProps) {
  return (
    <ScoreContainer>
      <div className={styles.highScore}>
        <span className={styles.scoreValue}>{7500}</span>
        <img src="./icons/crown-icon.svg" alt="" />
      </div>
      <span className={styles.scoreValue}>{score}</span>
      <></>
    </ScoreContainer>
  );
}

export default connector(ContainerScore);
