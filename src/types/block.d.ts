import { Grid } from '.';

export type Block = {
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
  floating: Block[];
  matching: Block[];
};
