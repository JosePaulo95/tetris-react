import { Grid } from '.';

export type Block = {
  key: number;
  initial_grid: Grid[];
  x: number;
  y: number;
  rotations: number;
  anim_state: string;
};

export type BlocksState = {
  piece: Block;
  board: Grid;
  limits: Grid;
  joinning: Block;
  floating: Block[];
  matching: Block[];
  particles: Block;
};
