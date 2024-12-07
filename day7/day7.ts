import { splitToNumber } from "../utils/parse";

function parseInput(input: string) {
  const lines = input.split("\n").map((line) => {
    const [testValue, numberString] = line.split(": ");
    const numbers = splitToNumber(" ")(numberString);
    return [parseInt(testValue), numbers] as const;
  });
  return lines;
}

function isMatch(test: number, numbers: number[]) {
  function run(total: number, rem: number[]): boolean {
    if (total > test) {
      return false;
    }
    if (rem.length === 1) {
      return rem[0] * total === test || rem[0] + total === test;
    }

    return (
      run(total * rem[0], rem.slice(1)) || run(total + rem[0], rem.slice(1))
    );
  }

  return run(numbers[0], numbers.slice(1));
}

export function day7part1(input: string) {
  const lines = parseInput(input);
  const matches = lines.filter((x) => isMatch(x[0], x[1]));

  return matches.reduce((o, [test]) => o + test, 0);
}

function concatNum(a: number, b: number): number {
  return parseInt([a, b].join(""));
}

export function isMatch2(test: number, numbers: number[]) {
  function run(total: number, rem: number[]): boolean {
    if (total > test) {
      return false;
    }
    if (rem.length === 1) {
      return (
        concatNum(total, rem[0]) === test ||
        rem[0] * total === test ||
        rem[0] + total === test
      );
    }

    return (
      run(concatNum(total, rem[0]), rem.slice(1)) ||
      run(total * rem[0], rem.slice(1)) ||
      run(total + rem[0], rem.slice(1))
    );
  }

  return run(numbers[0], numbers.slice(1));
}

export function day7part2(input: string) {
  const lines = parseInput(input);
  const matches = lines.filter((x) => isMatch2(x[0], x[1]));

  return matches.reduce((o, [test]) => o + test, 0);
}
