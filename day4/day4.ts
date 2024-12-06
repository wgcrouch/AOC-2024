const Directions = ["NW", "N", "NE", "E", "SE", "S", "SW", "W"] as const;
type Direction = (typeof Directions)[number];

const dirMap: { [key in Direction]: [number, number] } = {
  NW: [-1, -1],
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
};

function findWordsAtPosition(
  input: string[][],
  word: string,
  startX: number,
  startY: number
) {
  return Directions.filter((direction) => {
    let [dirX, dirY] = dirMap[direction];
    let x = startX;
    let y = startY;
    for (let i = 1; i < word.length; i++) {
      x = x + dirX;
      y = y + dirY;

      const val = input[y]?.[x];
      if (val !== word[i]) {
        return false;
      }
    }
    return true;
  }).length;
}

export function day4part1(input: string) {
  const lines = input.split("\n").map((line) => line.split(""));

  let total = 0;
  for (let y = 0; y < lines.length; y++) {
    let line = lines[y];
    for (let x = 0; x < line.length; x++) {
      if (line[x] === "X") {
        total += findWordsAtPosition(lines, "XMAS", x, y);
      }
    }
  }
  return total;
}

function isMasX(lines: string[][], x: number, y: number) {
  const nw = lines[y - 1]?.[x - 1];
  const ne = lines[y - 1]?.[x + 1];
  const sw = lines[y + 1]?.[x - 1];
  const se = lines[y + 1]?.[x + 1];

  return (
    ((nw == "M" && se === "S") || (nw === "S" && se === "M")) &&
    ((ne === "S" && sw === "M") || (ne === "M" && sw === "S"))
  );
}

export function day4part2(input: string) {
  const lines = input.split("\n").map((line) => line.split(""));

  let total = 0;
  for (let y = 1; y < lines.length - 1; y++) {
    let line = lines[y];
    for (let x = 1; x < line.length - 1; x++) {
      if (line[x] === "A") {
        if (isMasX(lines, x, y) ? 1 : 0) {
          total++;
        }
      }
    }
  }
  return total;
}
