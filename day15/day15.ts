import {
  E,
  findInGrid,
  Grid,
  N,
  S,
  W,
  move,
  XY,
  getAt,
  setAt,
  reduceGrid,
} from "../utils/grid";

function parseInput(input: string) {
  const [gridString, movesString] = input.split("\n\n");

  const grid: Grid<string> = gridString
    .split("\n")
    .map((line) => line.split(""));

  const moves = movesString.replace(/\n/g, "").split("");

  return { grid, moves };
}

const moveMap: Record<string, XY> = {
  "^": N,
  "<": W,
  ">": E,
  v: S,
};

const WALL = "#";
const ROBOT = "@";
const BLOCK = "O";

export function day15part1(input: string): number {
  const { grid, moves } = parseInput(input);

  let current = findInGrid(grid, ROBOT);
  if (!current) {
    throw new Error("could not find robot");
  }

  for (let instruction of moves) {
    let affected: Array<XY> = [];
    const dir = moveMap[instruction];
    let pos: XY | undefined = current;
    while (pos !== undefined) {
      let next: XY | undefined = move(grid, pos, dir);
      if (next == undefined) {
        pos = undefined;
        continue;
      }
      const val = getAt(grid, next);
      if (val === WALL) {
        affected = [];
        pos = undefined;
      } else if (val === BLOCK) {
        affected.push(pos);
        pos = next;
      } else {
        affected.push(pos);
        pos = undefined;
      }
    }

    if (affected.length) {
      for (let i = affected.length - 1; i >= 0; i--) {
        let pos = affected[i];
        let next = move(grid, affected[i], dir);
        setAt(grid, next!, getAt(grid, pos));
      }
      setAt(grid, current!, ".");
      current = move(grid, current!, dir);
    }
  }

  const total = reduceGrid(
    grid,
    (acc, val, [x, y]) => {
      if (val === BLOCK) {
        acc += y * 100 + x;
      }
      return acc;
    },
    0
  );
  return total;
}

export function day15part2(input: string): number {
  return 0;
}
