import { splitToNumber } from "../utils/parse";

function expandFs(input: string): Array<string | number> {
  const values = splitToNumber("")(input);

  const expanded: Array<"." | number> = [];
  let pointer = 0;
  let isValue = true;
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i]; j++) {
      expanded[pointer] = isValue ? Math.floor(i / 2) : ".";
      pointer++;
    }

    isValue = !isValue;
  }

  return expanded;
}

function computeChecksum(values: Array<string | number>): number {
  return values.reduce(
    (out: number, val, i) => out + (typeof val === "number" ? val : 0) * i,
    0
  );
}

export function day9part1(input: string) {
  const fs = expandFs(input);

  let left = 0;
  let right = fs.length - 1;
  while (left < right) {
    while (fs[right] === ".") {
      right--;
    }

    while (fs[right] !== "." && left < right) {
      while (fs[left] !== ".") {
        left++;
      }
      fs[left] = fs[right];
      fs[right] = ".";
      left++;
      right--;
    }
  }

  return computeChecksum(fs);
}

export function day9part2(input: string) {
  const values = splitToNumber("")(input);
  let blocks: Array<Array<string | number>> = [];
  for (let i = 0; i < values.length; i++) {
    let block = [];
    const isValue = i % 2 === 0;
    for (let j = 0; j < values[i]; j++) {
      block.push(isValue ? Math.floor(i / 2) : ".");
    }
    if (block.length) {
      blocks.push(block);
    }
  }
  let i = blocks.length - 1;
  while (i > 0) {
    while (blocks[i][0] === ".") {
      i--;
    }
    let current = blocks[i];

    const match = blocks.findIndex(
      (block, index) =>
        index < i && block[0] === "." && block.length >= current.length
    );
    if (match > -1) {
      const empty: Array<"."> = current.map(() => ".");
      if (blocks[i - 1]?.[0] === ".") {
        blocks.splice(i, 1);
        blocks[i - 1].push(...empty);
        if (blocks[i][0] === ".") {
          blocks[i - 1].push(...blocks[i]);
          blocks.splice(i, 1);
        }
      } else {
        blocks[i] = empty;
      }
      const matchBlock = [...blocks[match]];
      matchBlock.splice(0, current.length);
      const toInsert = [current, matchBlock].filter((x) => x.length);
      blocks.splice(match, 1, ...toInsert);
      if (toInsert.length > 1) {
        i++;
      }
    }
    i--;
  }

  const fs = blocks.flatMap((block) => block);

  return computeChecksum(fs);
}
