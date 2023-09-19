import { ScoreAction } from '../actions/score';

type ScoreState = number;
const INITIAL_SCORE_STATE = 0;

export default function ticks(
  state: ScoreState = INITIAL_SCORE_STATE,
  action: ScoreAction,
) {
  let count;
  switch (action.type) {
    case 'score/increment':
      count = action.payload;
      return state + count * 100;
    case 'score/reset':
      return 0;
    default:
      return state;
  }
}
