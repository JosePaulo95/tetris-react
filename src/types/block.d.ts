export type Block = {
  grid: number[][];
  x: number;
  y: number;
  currentGrid: () => number[][];
  translate: (x: number, y: number) => void;
  resetGrid: (grid: number[][]) => void;
};
