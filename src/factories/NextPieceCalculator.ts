import { PIECE_A_GRIDS } from '../constants';
import { getCurrentGrid, isColliding, join } from '../controller';
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
      const x_possiveis = getPossiveisX({ ...pieces[i], rotations: j });
      for (let k = 0; k < x_possiveis.length; k++) {
        const max_y = getMaxY({ ...pieces[i], rotations: j, x: x_possiveis[k] }, board);
        
        const pos_join = join(board, getCurrentGrid({ ...pieces[i], rotations: j, x: x_possiveis[k], y: max_y }))
        const qtde_matches = 
        // for (let l = board.length - 1; l < array.length; l++) {
        //   const element = array[l];
        // }
      }
    }
  }

  // se (x, max_y) válido
  // se posição.y-1 colide
  // calcular a qtde de matches (score de fitness)
  // assinalar o melhor score para a peça atual

  //retornar os scores

  return [];
};

export function getMaxY(piece: Block, board: Grid): number|undefined {
  let p_grid, colide;
  do {
    piece = { ...piece, y: piece.y + 1 };
    p_grid = getCurrentGrid(piece);
    colide = p_grid ? isColliding(p_grid, board) : undefined;
  } while (p_grid && !colide);

  const result = piece.y - 1;
  
  if (result === -1) {
    return undefined;
  }
  
  return result;
}

export function getPossiveisX(piece: Block): number[] {
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
