import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

type RootState = {
  ticks: number;
};

const mapStateToProps = (state: RootState): RootState => ({
  ticks: state.ticks,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ContainerAudioProps = PropsFromRedux;

function ContainerTicker({ ticks, dispatch }: ContainerAudioProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'ticker/increment' });
    }, 50);
    return () => clearInterval(interval);
  }, [ticks]);

  return <></>;
}

export default connector(ContainerTicker);
