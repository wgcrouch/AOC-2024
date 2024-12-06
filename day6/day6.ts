import { findInGrid, Grid, N, E, S, W, XY, move } from "../utils/grid";
import { splitToNumber } from "../utils/parse";

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
  let visited = new Set<string>();

  followPath(grid, start, N, (current) => {
    visited.add(current.join(","));
    return true;
  });

  return visited.size;
}

export function day6part2(input: string) {
  const grid = parseInput(input);
  let dir = N;
  let start: XY | undefined = findInGrid(grid, "^");
  if (!start) {
    return 0;
  }

  let positionsOnPath = new Set<string>();

  followPath(grid, start, dir, (current, dir) => {
    positionsOnPath.add(current.join(","));
    return true;
  });

  let loops = new Set<string>();
  for (let pos of positionsOnPath) {
    if (pos === start.join(",")) {
      continue;
    }
    let [x, y] = splitToNumber(",")(pos);

    let visitedWithDir = new Set<string>();

    grid[y][x] = "#";

    followPath(grid, start, N, (pos, dir) => {
      const key = [pos.join(","), dir.join(",")].join("|");

      if (visitedWithDir.has(key)) {
        loops.add([x, y].join(","));
        return false;
      }
      visitedWithDir.add(key);
      return true;
    });
    grid[y][x] = ".";
  }

  return loops.size;
}
