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

export function getAt<TVal>(grid: Grid<TVal>, [x, y]: XY): TVal {
  return grid[y]?.[x];
}

export function setAt<TVal>(grid: Grid<TVal>, pos: XY, val: TVal) {
  const [x, y] = pos;
  if (inBounds(grid, pos)) {
    grid[y][x] = val;
  }
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

export function reduceGrid<TVal, TReturn>(
  grid: Grid<TVal>,
  cb: (acc: TReturn, val: TVal, xy: XY) => TReturn,
  initial: TReturn
): TReturn {
  let acc = initial;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      acc = cb(acc, grid[y]?.[x], [x, y]);
    }
  }
  return acc;
}

export function inBounds(grid: Grid<any>, [x, y]: XY): boolean {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
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

export function getAllNeighbours<TVal>(grid: Grid<TVal>, xy: XY): Array<XY> {
  const neighbours = [NW, N, NE, W, E, SW, S, SE]
    .map((dir) => move(grid, xy, dir))
    .filter((x) => x !== undefined);

  return neighbours;
}

export function getNeighbours<TVal>(grid: Grid<TVal>, xy: XY): Array<XY> {
  const neighbours = [N, W, E, S]
    .map((dir) => move(grid, xy, dir))
    .filter((x) => x !== undefined);

  return neighbours;
}
