type TicksState = number;
const INITIAL_TICKS_STATE = 0;
export default function ticks(state: TicksState = INITIAL_TICKS_STATE, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    default:
      return state;
  }
}
