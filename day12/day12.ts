import {
  E,
  getAt,
  getNeighbours,
  Grid,
  move,
  N,
  S,
  setAt,
  W,
  XY,
  xyCache,
  xyToDir,
} from "../utils/grid";

type Region = {
  points: XY[];
  char: string;
};

function findRegions(grid: Grid<string>): Array<Region> {
  let visited = new xyCache();

  function dfs(
    grid: Grid<string>,
    start: XY,
    char: string,
    cb: (xy: XY) => void
  ) {
    let s: Array<XY> = [start];
    while (s.length) {
      let current = s.pop()!;
      if (visited.get(current)) {
        continue;
      }
      cb(current);

      let neighbours = getNeighbours(grid, current).filter(
        (xy) => getAt(grid, xy) === char
      );
      s.push(...neighbours);
    }
  }

  let regions: Array<Region> = [];
  let regionIndex = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (visited.get([x, y])) {
        continue;
      }
      let char = getAt(grid, [x, y]);
      if (char === undefined) {
        continue;
      }
      dfs(grid, [x, y], char, (xy) => {
        visited.add(xy, true);
        regions[regionIndex] = regions[regionIndex] ?? { points: [], char };
        regions[regionIndex].points.push(xy);
      });
      regionIndex++;
    }
  }

  return regions;
}

function countPerimeter({ points, char }: Region, grid: Grid<string>): number {
  return points.reduce((out, pos) => {
    let sameNeighbours = getNeighbours(grid, pos).filter(
      (neighbour) => getAt(grid, neighbour) === char
    );
    return out + 4 - sameNeighbours.length;
  }, 0);
}

export function day12part1(input: string) {
  const grid: Grid<string> = input.split("\n").map((x) => x.split(""));

  const regions = findRegions(grid);

  let total = 0;

  for (let region of regions) {
    const { points } = region;
    let area = points.length;
    let perimeter = countPerimeter(region, grid);

    total += area * perimeter;
  }

  return total;
}

function logGrid(grid: Grid<string>, point: XY) {
  const val = getAt(grid, point);
  setAt(grid, point, "*");
  console.table(grid);
  setAt(grid, point, val);
}

function countSides({ points, char }: Region, grid: Grid<string>): number {
  let dirs = [N, E, S, W];

  const isBorder = (point: XY | undefined, dir: XY): boolean =>
    point ? getAt(grid, move(grid, point, dir)) !== char : false;

  let sides = 0;
  for (let dir of dirs) {
    let visited = new xyCache();
    for (let point of points) {
      if (visited.get(point)) {
        continue;
      }
      if (isBorder(point, dir)) {
        sides++;
        visited.add(point, true);

        let walkDirs = [N, S].includes(dir) ? [E, W] : [N, S];

        for (let walkDir of walkDirs) {
          let i = 1;
          let next = move(grid, point, walkDir, i);
          while (getAt(grid, next) === char && isBorder(next, dir)) {
            visited.add(move(grid, point, walkDir, i)!, true);
            i++;
            next = move(grid, point, walkDir, i);
          }
        }
      }
    }
  }
  return sides;
}

export function day12part2(input: string) {
  const grid: Grid<string> = input.split("\n").map((x) => x.split(""));

  const regions = findRegions(grid);

  let total = 0;

  for (let region of regions) {
    const { points } = region;
    let area = points.length;
    let sides = countSides(region, grid);

    total += area * sides;
  }

  return total;
}
