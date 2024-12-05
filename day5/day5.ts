import { splitToNumber } from "../utils/parse";

function parseInput(input: string) {
  const [orderRaw, inputsRaw] = input.split("\n\n");

  const order = orderRaw.split("\n").map(splitToNumber("|"));
  const inputs = inputsRaw.split("\n").map(splitToNumber(","));
  const rules = order.reduce((out, [left, right]) => {
    const existing = out.get(left) ?? new Set();
    existing.add(right);
    out.set(left, existing);
    return out;
  }, new Map<number, Set<number>>());
  return [rules, inputs] as const;
}

function sortAndFilter(input: string) {
  const [rules, inputs] = parseInput(input);

  const correct: number[][] = [];
  const incorrect: number[][] = [];

  for (let input of inputs) {
    let error = false;

    input.sort((a, b) => {
      const aRule = rules.get(a);
      if (aRule?.has(b)) {
        error = true;
        return -1;
      }
      return 0;
    });

    if (error) {
      incorrect.push(input);
    } else {
      correct.push(input);
    }
  }

  return {
    correct,
    incorrect,
  };
}

function sumMiddles(arr: number[][]) {
  return arr.reduce((o, input) => {
    const middle = Math.ceil(input.length / 2) - 1;
    return o + input[middle];
  }, 0);
}

export function day5part1(input: string) {
  const { correct } = sortAndFilter(input);
  return sumMiddles(correct);
}

export function day5part2(input: string) {
  const { incorrect } = sortAndFilter(input);
  return sumMiddles(incorrect);
}
