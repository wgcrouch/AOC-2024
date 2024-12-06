import { findInGrid, Grid, N, E, S, W, XY, move, xyToDir } from "../utils/grid";

function parseInput(input: string): Grid<string> {
  return input.split("\n").map((x) => x.split(""));
}

function followPath(
  grid: Grid<string>,
  start: XY,
  dir: XY,
  cb: (pos: XY, dir: XY) => boolean
) {
  let current = start;

  while (current) {
    if (!cb(current, dir)) {
      break;
    }
    const next: XY | undefined = move(grid, current, dir);
    if (!next) {
      break;
    }
    if (grid[next[1]][next[0]] === "#") {
      dir = dir === N ? E : dir === E ? S : dir === S ? W : dir === W ? N : N;
    } else {
      current = next;
    }
  }
}

export function day6part1(input: string) {
  const grid = parseInput(input);
  let start: XY | undefined = findInGrid(grid, "^");

  if (!start) {
    return 0;
  }

  let visited = getNodesInPath(grid, start);
  return visited.length;
}

function getNodesInPath(grid: Grid<string>, start: XY): Array<XY> {
  let visitedCache: Array<Array<boolean>> = [];
  let visited: Array<XY> = [];

  followPath(grid, start, N, (pos) => {
    const [x, y] = pos;
    visitedCache[y] = visitedCache[y] ?? [];
    if (!visitedCache[y][x]) {
      visited.push(pos);
    }
    visitedCache[y][x] = true;
    return true;
  });

  return visited;
}

export function day6part2(input: string) {
  const grid = parseInput(input);

  let start: XY | undefined = findInGrid(grid, "^");
  if (!start) {
    return 0;
  }

  let positionsOnPath = getNodesInPath(grid, start);

  let loops = 0;
  for (let posToTest of positionsOnPath) {
    let [testX, testY] = posToTest;
    if (testX === start[0] && testY === start[1]) {
      continue;
    }

    let visitedWithDir: Array<Array<Set<string>>> = [];

    grid[testY][testX] = "#";

    followPath(grid, start, N, ([x, y], dir) => {
      const dirKey = xyToDir(dir);

      if (visitedWithDir[y]?.[x]?.has(dirKey)) {
        loops++;
        return false;
      }
      visitedWithDir[y] = visitedWithDir[y] ?? [];
      visitedWithDir[y][x] = visitedWithDir[y][x] ?? new Set();
      visitedWithDir[y][x].add(dirKey);
      return true;
    });
    grid[testY][testX] = ".";
  }

  return loops;
}
