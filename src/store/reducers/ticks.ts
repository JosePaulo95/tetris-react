import { TicksAction } from '../actions/ticks';

type TicksState = number;
const INITIAL_TICKS_STATE = 0;

let isGamePaused = false; // Variável global para controle de pausa, o certo seria alterar o estado

export default function ticks(state = INITIAL_TICKS_STATE, action: TicksAction) {
  switch (action.type) {
    case 'ticker/increment':
      return isGamePaused ? state : state + 1;
    case 'ticker/pause':
      isGamePaused = true;
      return state;
    case 'ticker/resume':
      isGamePaused = false;
      return state;
    default:
      return state;
  }
}
