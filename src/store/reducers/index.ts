import { combineReducers } from 'redux';

import blocks from './blocks';
import ticks from './ticks';

export default combineReducers({
  blocks,
  ticks,
});
