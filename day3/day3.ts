export function day3part1(input: string) {
  const muls = input.matchAll(/mul\((\d+),(\d+)\)/g);

  let total = 0;

  for (let [_, a, b] of muls) {
    total += parseInt(a) * parseInt(b);
  }

  return total;
}

export function day3part2(input: string) {
  const instructions = input.matchAll(
    /(mul\((\d+),(\d+)\))|(don\'t\(\))|(do\(\))/g
  );

  let active = true;
  let total = 0;

  for (let instruction of instructions) {
    if (instruction[0].startsWith("don")) {
      active = false;
    } else if (instruction[0].startsWith("do")) {
      active = true;
    } else if (active) {
      total += parseInt(instruction[2]) * parseInt(instruction[3]);
    }
  }

  return total;
}
