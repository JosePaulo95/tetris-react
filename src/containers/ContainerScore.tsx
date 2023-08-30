import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

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
  return <>{score}</>;
}

export default connector(ContainerScore);
