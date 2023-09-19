type ScoreIncrement = {
  type: 'score/increment';
  payload: number;
};

export type ScoreAction = ScoreIncrement;
