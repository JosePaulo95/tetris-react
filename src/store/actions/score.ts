type ScoreIncrement = {
  type: 'score/increment';
  payload: number;
};

type ScoreReset = {
  type: 'score/reset';
};

export type ScoreAction = ScoreIncrement | ScoreReset;
