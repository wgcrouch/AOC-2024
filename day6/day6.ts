import { findInGrid, Grid, N, XY } from "../utils/grid";

function parseInput(input: string): Grid<string> {
  return input.split("\n").map((x) => x.split(""));
}

export function day6part1(input: string) {
  const grid = parseInput(input);
  let currentDir = N;
  let current: XY | undefined = findInGrid(grid, "^");
  while (current) {}
}

export function day6part2(input: string) {}
