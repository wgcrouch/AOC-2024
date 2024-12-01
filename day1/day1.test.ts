import { expect, test } from "vitest";
import { day1part1, day1part2 } from "./day1";
import { day1input } from "./input";

const day1Example1 = `3   4
4   3
2   5
1   3
3   9
3   3`;



test("day 1 part 1 example", () => {
  expect(day1part1(day1Example1)).toEqual(11);
});

test("day 1 part 1 real", () => {
  expect(day1part1(day1input)).toEqual(3508942);
});

test("day 1 part 2 example", () => {
  expect(day1part2(day1Example1)).toEqual(31);
});

test("day 1 part 2 real", () => {
  expect(day1part2(day1input)).toEqual(26593248);
});
