import { useEffect } from 'react';
import { connect } from 'react-redux';

function ContainerTicker({ ticks, dispatch }) {
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        dispatch({ type: 'increment' });
      } catch (error) {
        console.log(error);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [ticks]);

  return <></>;
}

const mapStateToProps = (state) => ({
  ticks: state.ticks,
});

export default connect(mapStateToProps)(ContainerTicker);
