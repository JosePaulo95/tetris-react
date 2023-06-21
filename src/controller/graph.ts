import { Grid } from '../types';

export function splitDisconnectedGraphs(grid: number[][]): Grid[] {
  const coordinatesGroups: number[][][] = findDisconnectedGraphs(grid);
  return coordinatesGroups.map((coordinates: number[][]) =>
    extractGridValues(grid, coordinates),
  );
}

function extractGridValues(grid: number[][], coordinates: number[][]): number[][] {
  const extractedGrid: number[][] = [];

  for (let i = 0; i < grid.length; i++) {
    extractedGrid.push(Array(grid[i].length).fill(0));
  }

  for (const [row, col] of coordinates) {
    extractedGrid[row][col] = grid[row][col];
  }

  return extractedGrid;
}

function findDisconnectedGraphs(grid: number[][]): number[][][] {
  const rows: number = grid.length;
  const cols: number = grid[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );
  const disconnectedGraphs: number[][][] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] !== 0 && !visited[row][col]) {
        const disconnectedGraph: number[][] = [];

        bfs(row, col, grid, visited, disconnectedGraph);

        disconnectedGraphs.push(disconnectedGraph);
      }
    }
  }

  return disconnectedGraphs;
}

function bfs(
  startRow: number,
  startCol: number,
  grid: number[][],
  visited: boolean[][],
  disconnectedGraph: number[][],
): void {
  const rows: number = grid.length;
  const cols: number = grid[0].length;
  const queue: [number, number][] = [];

  queue.push([startRow, startCol]);
  visited[startRow][startCol] = true;

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;
    disconnectedGraph.push([row, col]);

    // Define the four possible directions (up, down, left, right)
    const directions: [number, number][] = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] !== 0 &&
        !visited[newRow][newCol]
      ) {
        queue.push([newRow, newCol]);
        visited[newRow][newCol] = true;
      }
    }
  }
}
