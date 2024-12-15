import { describe, expect, test } from "vitest";
import { day14part1, day14part2 } from "./day14";
import { day14input } from "../input/day14";

const day14Example1 = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`.trim();

describe("day 14", () => {
  test("day 14 part 1 example", () => {
    expect(day14part1(day14Example1, 11, 7)).toEqual(12);
  });

  test("day 14 part 1 real", () => {
    expect(day14part1(day14input, 101, 103)).toEqual(211773366);
  });

  test("day 14 part 2 real", () => {
    expect(day14part2(day14input, 101, 103)).toEqual(7344);
  });
});
