// Definição dos tipos de ação
type TickerIncrement = {
  type: 'ticker/increment';
};

type TickerPause = {
  type: 'ticker/pause';
};

type TickerResume = {
  type: 'ticker/resume';
};

// Tipo unificado para todas as ações relacionadas a "ticks"
export type TicksAction = TickerIncrement | TickerPause | TickerResume;
