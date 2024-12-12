let stepCache: { [key: string]: string[] } = {};

function step(s: string): Array<string> {
  if (stepCache[s]) {
    return stepCache[s];
  }
  if (s === "0") {
    return ["1"];
  }

  if (s.length % 2 === 0) {
    const half = s.length / 2;
    return [s.substring(0, half), parseInt(s.substring(half)).toString()];
  }

  const result = [(parseInt(s) * 2024).toString()];
  stepCache[s] = result;

  return result;
}

let cache: { [key: string]: Array<number> } = {};

function addToCache(stone: string, remaining: number, total: number) {
  cache[stone] = cache[stone] ?? [];
  cache[stone][remaining] = total;
}

function countStones(stone: string, remaining: number): number {
  if (cache[stone]?.[remaining]) {
    return cache[stone]?.[remaining];
  }
  const stones = step(stone);

  if (remaining === 1) {
    return stones.length;
  }

  let total = countStones(stones[0], remaining - 1);
  if (stones[1] !== undefined) {
    total += countStones(stones[1], remaining - 1);
  }
  addToCache(stone, remaining, total);
  return total;
}

function run(input: string, steps: number): number {
  let stones = input.split(" ");

  let total = 0;

  for (let stone of stones) {
    total += countStones(stone, steps);
  }

  return total;
}

export function day11part1(input: string) {
  return run(input, 25);
}

export function day11part2(input: string) {
  return run(input, 75);
}
