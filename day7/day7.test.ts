import { describe, expect, test } from "vitest";
import { day7part1, day7part2, isMatch2 } from "./day7";
import { day7input } from "../input/day7";

const day7Example1 = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

describe("day 7", () => {
  test("day 7 part 1 example 1", () => {
    expect(day7part1(day7Example1)).toEqual(3749);
  });

  test("day 7 part 1 real", () => {
    expect(day7part1(day7input)).toEqual(1298103531759);
  });

  test("day 7 part 2 example", () => {
    expect(day7part2(day7Example1)).toEqual(11387);
  });

  test("isMatch2", () => {
    expect(isMatch2(190, [10, 19])).toBeTruthy();
    expect(isMatch2(3267, [81, 40, 27])).toBeTruthy();
    expect(isMatch2(83, [17, 5])).toBeFalsy();
    expect(isMatch2(156, [15, 6])).toBeTruthy();
    expect(isMatch2(7290, [6, 8, 6, 15])).toBeTruthy();
    expect(isMatch2(161011, [16, 10, 13])).toBeFalsy();
    expect(isMatch2(192, [17, 8, 14])).toBeTruthy();
    expect(isMatch2(21037, [9, 7, 18, 13])).toBeFalsy();
    expect(isMatch2(292, [11, 6, 16, 20])).toBeTruthy();
  });

  test("day 7 part 2 real", () => {
    expect(day7part2(day7input)).toEqual(140575048428831);
  });
});
