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

const xyDirMap: Record<string, Record<string, string>> = {
  "-1": { "-1": "NW", "0": "N", "1": "NE" },
  "0": { "-1": "W", "0": "", "1": "E" },
  "1": { "-1": "SW", "0": "S", "1": "SE" },
};
export const xyToDir = ([x, y]: XY): string => {
  return xyDirMap[y.toString()]?.[x];
};

export function getFromDirection<TVal>(
  grid: Grid<TVal>,
  dir: XY,
  current: XY = [0, 0],
  steps = 1
) {
  const newPos = move(grid, current, dir, steps);
  if (!newPos) {
    return undefined;
  }
  const [x, y] = newPos;
  return grid[y]?.[x];
}

export function move<TVal>(
  grid: Grid<TVal>,
  [x, y]: XY,
  [dx, dy]: XY,
  steps = 1
): XY | undefined {
  const newX = x + dx * steps;
  if (newX >= grid[y].length || newX < 0) {
    return undefined;
  }
  const newY = y + dy * steps;

  if (newY >= grid.length || newY < 0) {
    return undefined;
  }

  return [x + dx * steps, y + dy * steps];
}

export function findInGrid(grid: Grid, s: string): XY | undefined {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (grid[y][x] === s) {
        return [x, y];
      }
    }
  }
  return undefined;
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
