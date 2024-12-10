import { getAt, Grid, inBounds, reduceGrid, setAt, XY } from "../utils/grid";

function parseInput(input: string): Grid<string> {
  return input.split("\n").map((line) => line.split(""));
}

function pairs<TVal>(arr: Array<TVal>, cb: (pair: [TVal, TVal]) => void) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i; j < arr.length - 1; j++) {
      cb([arr[i], arr[j + 1]]);
    }
  }
}

function getLettersMap(grid: Grid<string>) {
  return reduceGrid(
    grid,
    (acc, val, [x, y]) => {
      if (val !== ".") {
        let e = acc.get(val) ?? [];
        e.push([x, y]);
        return acc.set(val, e);
      }
      return acc;
    },

    new Map<string, XY[]>()
  );
}

export function day8part1(input: string) {
  const grid = parseInput(input);
  const letters = getLettersMap(grid);

  let count = 0;

  function markAntinode(point: XY) {
    const existing = getAt(grid, point);
    if (existing !== "#") {
      setAt(grid, point, "#");
      count++;
    }
  }

  for (let coords of letters.values()) {
    pairs(coords, (pair) => {
      let [ax, ay] = pair[0];
      let [bx, by] = pair[1];

      const dx = Math.abs(ax - bx);
      const dy = Math.abs(ay - by);

      const pointA: XY = [ax + (ax < bx ? -dx : dx), ay + (ay < by ? -dy : dy)];
      const pointB: XY = [bx + (ax < bx ? dx : -dx), by + (ay < by ? dy : -dy)];

      if (inBounds(grid, pointA)) {
        markAntinode(pointA);
      }

      if (inBounds(grid, pointB)) {
        markAntinode(pointB);
      }
    });
  }

  return count;
}

export function day8part2(input: string) {
  const grid = parseInput(input);
  const letters = getLettersMap(grid);

  let count = 0;

  function markAntinode(point: XY) {
    const existing = getAt(grid, point);
    if (existing !== "#") {
      setAt(grid, point, "#");
      count++;
    }
  }

  for (let coords of letters.values()) {
    pairs(coords, (pair) => {
      let [ax, ay] = pair[0];
      let [bx, by] = pair[1];

      const dx = ax - bx;
      const dy = ay - by;

      markAntinode(pair[0]);
      markAntinode(pair[1]);

      let newPoint: XY = [ax + dx, ay + dy];
      let i = 1;
      while (inBounds(grid, newPoint)) {
        markAntinode(newPoint);
        newPoint = [ax + dx * i, ay + dy * i];
        i++;
      }

      let newPoint2: XY = [ax - dx, ay - dy];
      let j = 1;
      while (inBounds(grid, newPoint2)) {
        markAntinode(newPoint2);
        newPoint2 = [ax - dx * j, ay - dy * j];
        j++;
      }
    });
  }

  return count;
}
