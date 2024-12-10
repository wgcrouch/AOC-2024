import { getAt, getNeighbours, Grid, reduceGrid, XY } from "../utils/grid";
import { splitToNumber } from "../utils/parse";

function walkTrails(grid: Grid<number>, start: XY, cb: (end: XY) => void) {
  let stack: Array<[XY, number]> = [[start, 1]];
  while (stack.length) {
    let [current, check] = stack.pop()!;
    let neighbours = getNeighbours(grid, current);
    for (let neighbour of neighbours) {
      const value = getAt(grid, neighbour);
      if (value === check) {
        if (check === 9) {
          cb(neighbour);
        } else {
          stack.unshift([neighbour, check + 1]);
        }
      }
    }
  }
}

function isTrailHead(grid: Grid<number>, xy: XY) {
  return getAt(grid, xy) === 0;
}

export function day10part1(input: string) {
  const grid: Grid<number> = input.split("\n").map(splitToNumber(""));

  function countDistinctEnds(start: XY): number {
    if (!isTrailHead(grid, start)) {
      return 0;
    }
    let reached: boolean[][] = [];
    let count = 0;
    walkTrails(grid, start, ([endx, endy]) => {
      reached[endy] = reached[endy] ?? [];
      if (!reached[endy][endx]) {
        reached[endy][endx] = true;
        count++;
      }
    });
    return count;
  }

  return reduceGrid(grid, (out, val, xy) => out + countDistinctEnds(xy), 0);
}

export function day10part2(input: string) {
  const grid: Grid<number> = input.split("\n").map(splitToNumber(""));

  function countTrails(start: XY): number {
    if (!isTrailHead(grid, start)) {
      return 0;
    }
    let count = 0;
    walkTrails(grid, start, () => {
      count++;
    });

    return count;
  }

  return reduceGrid(grid, (out, val, xy) => out + countTrails(xy), 0);
}
