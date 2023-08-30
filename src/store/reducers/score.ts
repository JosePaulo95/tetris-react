import { ScoreAction } from '../actions/score';

type ScoreState = number;
const INITIAL_SCORE_STATE = 0;

export default function ticks(
  state: ScoreState = INITIAL_SCORE_STATE,
  action: ScoreAction,
) {
  switch (action.type) {
    case 'score/increment':
      return state + 100;
    default:
      return state;
  }
}
