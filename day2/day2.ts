export function isSafe(array: Array<number>) {
  let increasing = false;
  for (let i = 0; i < array.length - 1; i++) {
    const diff = array[i + 1] - array[i];
    const absDiff = Math.abs(diff);

    if (diff === 0 || absDiff > 3) {
      return false;
    }

    if (i === 0) {
      increasing = diff > 0;
    }

    if (diff > 0 !== increasing) {
      return false;
    }
  }
  return true;
}

export function isSafeWithSkip(array: Array<number>) {
  if (isSafe(array)) {
    return true;
  }
  for (let i = 0; i < array.length; i++) {
    const newArray = [...array.slice(0, i), ...array.slice(i + 1)];
    if (isSafe(newArray)) {
      return true;
    }
  }
  return false;
}

function parseInput(input: string) {
  return input.split("\n").map((x) => x.split(" ").map((x) => parseInt(x)));
}

export function day2part1(input: string) {
  const lines = parseInput(input);

  const results = lines.filter(isSafe);
  return results.length;
}

export function day2part2(input: string) {
  const lines = parseInput(input);
  const results = lines.filter(isSafeWithSkip);
  return results.length;
}
