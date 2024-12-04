import {
  E,
  Grid,
  N,
  NE,
  NW,
  S,
  SE,
  SW,
  W,
  XY,
  getFromDirection,
  sumGrid,
} from "../utils/grid";

function parseInput(input: string) {
  return input.split("\n").map((line) => line.split(""));
}

const directions: XY[] = [NW, N, NE, E, SE, S, SW, W];

const testDirection = (grid: Grid, xy: XY, dir: XY) =>
  ["X", "M", "A", "S"].every(
    (letter, i) => letter === getFromDirection(grid, dir, xy, i)
  );

const findWordsAtPosition = (grid: Grid, xy: XY) =>
  directions.filter((dir) => testDirection(grid, xy, dir)).length;

export function day4part1(input: string) {
  return sumGrid(parseInput(input), findWordsAtPosition);
}

function isMasX(lines: Grid, xy: XY): number {
  const [x, y] = xy;
  if (lines[y][x] !== "A") {
    return 0;
  }
  const nw = getFromDirection(lines, NW, xy);
  const ne = getFromDirection(lines, NE, xy);
  const sw = getFromDirection(lines, SW, xy);
  const se = getFromDirection(lines, SE, xy);

  return Number(
    ((nw == "M" && se === "S") || (nw === "S" && se === "M")) &&
      ((ne === "S" && sw === "M") || (ne === "M" && sw === "S"))
  );
}

export function day4part2(input: string) {
  return sumGrid(parseInput(input), isMasX);
}
