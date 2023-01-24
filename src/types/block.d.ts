export type Block = {
  grid: number[][];
  x: number;
  y: number;
  display: () => number[][];
  translate: (x: number, y: number) => void;
};
