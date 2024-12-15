import { getAt, Grid, XY } from "../utils/grid";
import { splitToNumber } from "../utils/parse";

type Robot = {
  position: XY;
  velocity: XY;
};

function parseInput(input: string): Array<Robot> {
  const lines = input.split("\n");
  const robots = lines.map((line) => {
    const [posString, velString] = line.split(" ");
    const position = splitToNumber(",")(posString.replace("p=", "")) as XY;
    const velocity: XY = splitToNumber(",")(velString.replace("v=", "")) as XY;
    return { position, velocity, original: position.slice() };
  });

  return robots;
}

function mod(num: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error("division by zero");
  }

  let modulus = Math.abs(num % divisor);
  if (modulus === 0) {
    return modulus;
  }
  modulus = num < 0 ? divisor - modulus : modulus;

  return divisor > 0 ? modulus : -modulus;
}

function safetyFactor(
  grid: Grid<number>,
  width: number,
  height: number
): number {
  let totals = [0, 0, 0, 0];

  for (let y = 0; y < Math.floor(height / 2); y++) {
    for (let x = 0; x < Math.floor(width / 2); x++) {
      totals[0] += getAt(grid, [x, y]) ?? 0;
    }
  }

  for (let y = Math.ceil(height / 2); y < height; y++) {
    for (let x = 0; x < Math.floor(width / 2); x++) {
      totals[1] += getAt(grid, [x, y]) ?? 0;
    }
  }

  for (let y = 0; y < Math.floor(height / 2); y++) {
    for (let x = Math.ceil(width / 2); x < width; x++) {
      totals[2] += getAt(grid, [x, y]) ?? 0;
    }
  }

  for (let y = Math.ceil(height / 2); y < height; y++) {
    for (let x = Math.ceil(width / 2); x < width; x++) {
      totals[3] += getAt(grid, [x, y]) ?? 0;
    }
  }

  return totals[0] * totals[1] * totals[2] * totals[3];
}

function moveRobots(
  robots: Array<Robot>,
  width: number,
  height: number,
  seconds: number
): Array<Robot> {
  let newRobots: Array<Robot> = [];
  for (let robot of robots) {
    let x = mod(robot.position[0] + robot.velocity[0] * seconds, width);
    let y = mod(robot.position[1] + robot.velocity[1] * seconds, height);

    newRobots.push({
      position: [x, y],
      velocity: robot.velocity,
    });
  }

  return newRobots;
}

function buildGrid(
  robots: Array<Robot>,
  width: number,
  height: number
): Grid<number> {
  let grid: Grid<number> = [];
  for (let y = 0; y < height; y++) {
    grid[y] = new Array(width).fill(0);
  }
  for (let { position } of robots) {
    let [x, y] = position;
    try {
      grid[y][x]++;
    } catch (e) {
      console.log(e);
    }
  }
  return grid;
}

export function day14part1(
  input: string,
  width: number,
  height: number
): number {
  const robots = moveRobots(parseInput(input), width, height, 100);

  const grid = buildGrid(robots, width, height);

  return safetyFactor(grid, width, height);
}

export function day14part2(input: string, width: number, height: number) {
  const robotsSource = parseInput(input);

  let min = [0, Infinity];

  let grid: Grid<number> = [];
  for (let i = 0; i < 20000; i++) {
    const robots = moveRobots(robotsSource, width, height, i);
    grid = buildGrid(robots, width, height);
    const factor = safetyFactor(grid, width, height);
    if (factor < min[1]) {
      min = [i, factor];
    }
  }

  // This just prints out the picture
  const robots = moveRobots(robotsSource, width, height, min[0]);
  grid = buildGrid(robots, width, height);

  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      if (getAt(grid, [x, y]) === 0) {
        row.push(" ");
      } else {
        row.push("0");
      }
    }
    console.log(row.join(""));
  }
  return min[0];
}
