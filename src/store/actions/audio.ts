type AudioPlay = {
  type: 'audio/play';
  payload: string; //nome/id da faixa
};

type AudioPause = {
  type: 'audio/pause';
  payload: string;
};

export type AudioAction = AudioPlay | AudioPause;
