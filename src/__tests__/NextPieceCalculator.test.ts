import { EMPTY_GRID, PIECE_A_GRIDS, PIECE_D_GRIDS } from '../constants';
import { wrapGrid } from '../controller';
import { getPossiveisX } from '../factories/NextPieceCalculator';
import { createPiece } from '../factories/PieceFactory';

test('calcula x possíveis adequadamente da peça z', () => {
  const piece_grids = PIECE_A_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, 6, 8)));
  const x_possiveis = getPossiveisX(piece);
  expect(x_possiveis).toEqual([-1, 0, 1, 2]);
});

test('calcula x possíveis adequadamente da peça l', () => {
  const piece_grids = PIECE_D_GRIDS(1);
  const piece = createPiece(piece_grids.map((g) => wrapGrid(g, 6, 8)));
  const x_possiveis = getPossiveisX({ ...piece, rotations: 1 });
  expect(x_possiveis).toEqual([-1, 0, 1]);
});
