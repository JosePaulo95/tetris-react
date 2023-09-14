type PieceMoveDownAction = {
  type: 'piece/move-down';
};

type PieceMoveDownMaxAction = {
  type: 'piece/move-down-max';
};

type PieceMoveRightAction = {
  type: 'piece/move-right';
};

type PieceMoveLeftAction = {
  type: 'piece/move-left';
};

type PieceRotateAction = {
  type: 'piece/rotate';
};

type PieceJoinAction = {
  type: 'piece/join';
};

type FloatingJoinAction = {
  type: 'floating/join';
  payload: number; //index
};

type PieceResetAction = {
  type: 'piece/reset';
};

type BoardCombinationsAction = {
  type: 'board/combinations';
};

type BlocksResetAction = {
  type: 'blocks/reset';
};

type FloatingFallAction = {
  type: 'floating/fall';
};

export type BlocksAction =
  | PieceMoveDownAction
  | PieceMoveDownMaxAction
  | PieceMoveRightAction
  | PieceMoveLeftAction
  | PieceRotateAction
  | PieceJoinAction
  | FloatingJoinAction
  | PieceResetAction
  | BoardCombinationsAction
  | BlocksResetAction
  | FloatingFallAction;
