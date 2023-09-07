import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Score from '../components/Score';
import ScoreContainer from '../components/ScoreContainer';

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
      <Score current={score}></Score>
      <></>
    </ScoreContainer>
  );
}

export default connector(ContainerScore);
