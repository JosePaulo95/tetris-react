import { PIECE_A_GRIDS } from '../constants';
import { getCurrentGrid } from '../controller';
import { Block, Grid } from '../types';

export type fitnesses = {
  id: number;
  fitness: number;
};

export const calcPiecesFitness = (board: Grid, pieces: Block[]): fitnesses[] => {
  // para cada peça
  for (let i = 0; i < pieces.length; i++) {
    // para cada rotação
    for (let j = 0; j < pieces[i].initial_grid.length; j++) {
      // para cada x possível
      // const xs = getPossiveisX({ ...pieces[i], rotations: j });
      // for (let k = 0; k < xs.length; k++) {
      // }
    }
  }

  // se (x, max_y) válido
  // se posição.y-1 colide
  // calcular a qtde de matches (score de fitness)
  // assinalar o melhor score para a peça atual

  //retornar os scores

  return [];
};

export function getPossiveisX(piece: Block) {
  const xs = [];
  const grid = getCurrentGrid(piece);
  if (!grid) {
    return [];
  }
  const width = Array.from(grid[0]).length;
  for (let x = -width; x <= width; x++) {
    if (getCurrentGrid({ ...piece, x })) {
      xs.push(x);
    }
  }

  return xs;
}
