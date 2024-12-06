import { findInGrid, Grid, N, E, S, W, XY, move } from "../utils/grid";

function parseInput(input: string): Grid<string> {
  return input.split("\n").map((x) => x.split(""));
}

export function day6part1(input: string) {
  const grid = parseInput(input);
  let dir = N;
  let current: XY | undefined = findInGrid(grid, "^");

  if (!current) {
    return 0;
  }
  let visited = new Set<string>();

  while (current) {
    visited.add(current.join(","));
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
  return visited.size;
}

export function day6part2(input: string) {}
