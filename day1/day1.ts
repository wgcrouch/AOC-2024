export function day1part1(input: string) {
  const lines = input.split("\n");
  let first = [];
  let second = [];

  for (let i = 0; i < lines.length; i++) {
    const [a, b] = lines[i].split("  ").map((x) => parseInt(x));
    first[i] = a;
    second[i] = b;
  }

  first.sort();
  second.sort();

  let total = 0;
  for (let i = 0; i < first.length; i++) {
    total += Math.abs(first[i] - second[i]);
  }
  return total;
}

export function day1part2(input: string) {
  const lines = input.split("\n");
  let first = [];
  let total = 0;
  let freq = new Map<number, number>();

  for (let i = 0; i < lines.length; i++) {
    const [a, b] = lines[i].split("  ").map((x) => parseInt(x));
    first[i] = a;
    const second = b;
    freq.set(second, (freq.get(second) ?? 0) + 1);
  }

  for (let i = 0; i < first.length; i++) {
    const val = first[i];
    total += val * (freq.get(val) ?? 0);
  }

  return total;
}
