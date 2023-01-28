import { configureStore } from '@reduxjs/toolkit';

import { emptyPiece, limitsPiece, randomPiece } from '../factories/PieceFactory';

const INITIAL_STATE = {
  piece: randomPiece(),
  board: emptyPiece(),
  limits: limitsPiece(),
};

const reducer = (state = INITIAL_STATE, action) => {
  return state;
};

const store = configureStore({ reducer });

export default store;
