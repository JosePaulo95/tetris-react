import { EMPTY_GRID, PIECE_I_GRIDS, PIECE_L_GRIDS, PIECE_Z_GRIDS } from '../constants';
import { calcAvgHeight, countCombinations, wrap, wrapGrid } from '../controller';
import { calcMaxMatches, getMaxY, getPossiveisX } from '../factories/NextPieceCalculator';
import { createPiece, emptyPiece } from '../factories/PieceFactory';
import { Grid } from '../types';

test('calcula x possíveis adequadamente da peça z', () => {
  const piece_grids = PIECE_Z_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, 6, 8)));
  const x_possiveis = getPossiveisX(piece);
  expect(x_possiveis).toEqual([-1, 0, 1, 2]);
});

test('calcula x possíveis adequadamente da peça l', () => {
  const piece_grids = PIECE_I_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, 6, 8)));
  const x_possiveis = getPossiveisX({ ...piece, rotations: 1 });
  expect(x_possiveis).toEqual([-1, 0, 1]);
});

test('calcula max y para peça L e tabuleiro vazio', () => {
  const width = 6;
  const height = 6;

  const piece_grids = PIECE_L_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, width, height)));
  const board = wrapGrid(EMPTY_GRID(), width, height);

  const max_y = getMaxY(piece, board);
  expect(max_y).toEqual(3);
});

test('calcula max y para peça z num tabuleiro exato', () => {
  const width = 6;
  const height = 6;

  const piece_grids = PIECE_Z_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, width, height)));
  const b = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
  ];
  const board = wrapGrid(b, width, height);

  piece.rotations = 1;
  const max_y = getMaxY(piece, board);
  expect(max_y).toEqual(2);
});

test('conta corretamente a qtde de matches', () => {
  const width = 4;
  const height = 6;

  const piece_grids = PIECE_Z_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, width, height)));
  const b = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
  ];
  const board = wrapGrid(b, width, height);

  piece.rotations = 1;
  piece.y = 2;
  expect(countCombinations(board, piece)).toEqual(3);
});

test('conta matches parciais', () => {
  const width = 4;
  const height = 6;

  const piece_grids = [EMPTY_GRID()];
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, width, height)));
  const b = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 3, 0],
    [1, 2, 3, 0],
    [1, 1, 3, 2],
    [1, 0, 1, 1],
  ];
  const board = wrapGrid(b, width, height);

  expect(countCombinations(board, piece)).toEqual(2.4);
});

test('conta corretamente a qtde de matches para peça L', () => {
  const width = 6;
  const height = 6;

  const piece_grids = PIECE_L_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, width, height)));
  const b = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 3],
    [2, 2, 0, 0, 0, 3],
  ];
  const board = wrapGrid(b, width, height);

  expect(calcMaxMatches(board, piece)).toEqual(1);
});

it('avgHeight should return the average height of the board', () => {
  const board: Grid = [
    [0, 0, 1, 0],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];

  const result = calcAvgHeight(board);
  expect(result).toBe(3); // Ajuste conforme o cálculo correto para sua grade
});

it('avgHeight should return 0 for an empty board', () => {
  const board: Grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const result = calcAvgHeight(board);
  expect(result).toBe(0);
});
