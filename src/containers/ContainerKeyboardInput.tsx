import { useEffect } from 'react';
import { connect } from 'react-redux';

import { rightMove } from './store/actions/blocks';

function ContainerKeyboardInput({ dispatch }) {
  useEffect(() => {
    // dispatch(rightMove());
  }, []);
  return <></>;
}

export default connect()(ContainerKeyboardInput);
