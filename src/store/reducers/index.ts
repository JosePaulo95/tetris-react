import { combineReducers } from 'redux';

import audio from './audio';
import blocks from './blocks';
import ticks from './ticks';

export default combineReducers({
  blocks,
  ticks,
  audio,
});
