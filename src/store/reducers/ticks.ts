import { TicksAction } from '../actions/ticks';

type TicksState = number;
const INITIAL_TICKS_STATE = 0;

export default function ticks(
  state: TicksState = INITIAL_TICKS_STATE,
  action: TicksAction,
) {
  switch (action.type) {
    case 'ticker/increment':
      return state + 1;
    default:
      return state;
  }
}
