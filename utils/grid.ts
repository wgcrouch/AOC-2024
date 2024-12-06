export type XY = [x: number, y: number];
export type Grid<TVal = string> = TVal[][];

export const NW: XY = [-1, -1];
export const N: XY = [0, -1];
export const NE: XY = [1, -1];
export const E: XY = [1, 0];
export const SE: XY = [1, 1];
export const S: XY = [0, 1];
export const SW: XY = [-1, 1];
export const W: XY = [-1, 0];

export function getFromDirection<TVal>(
  grid: Grid<TVal>,
  [dx, dy]: XY,
  [x, y]: XY = [0, 0],
  steps = 1
) {
  return grid[y + dy * steps]?.[x + dx * steps];
}

export function sumGrid<TVal>(
  grid: Grid<TVal>,
  fn: (grid: Grid<TVal>, xy: XY) => number
) {
  let total = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      total += fn(grid, [x, y]);
    }
  }
  return total;
}
