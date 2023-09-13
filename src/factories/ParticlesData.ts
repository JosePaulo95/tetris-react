import { configs } from '../configs';
import { wrapGrid } from '../controller';
import { createPiece } from './PieceFactory';

export const createParticles = () => {
  const grid = wrapGrid([[0]], configs.width, configs.height);
  return createPiece([grid]);
};
