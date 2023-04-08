type TicksState = number;
const INITIAL_TICKS_STATE = 0;
const paused = false;

export default function ticks(state: TicksState = INITIAL_TICKS_STATE, action) {
  switch (action.type) {
    case 'ticker/increment':
      if (!paused) {
        return state + 1;
      } else {
        return state;
      }
    default:
      return state;
  }
}
