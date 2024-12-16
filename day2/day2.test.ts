import { expect, test } from "vitest";
import { day2part1, day2part2, isSafe, isSafeWithSkip } from "./day2";
import { day2input } from "../input/day2";

const day2Example1 = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

test("day 2 part 1 example", () => {
  expect(day2part1(day2Example1)).toEqual(2);
});

test("day 2 part 1 real", () => {
  expect(day2part1(day2input)).toEqual(564);
});

test("day 2 part 2 example", () => {
  expect(day2part2(day2Example1)).toEqual(4);
});

test("day 2 part 2 real", () => {
  expect(day2part2(day2input)).toEqual(604);
});

test("isSafe", () => {
  expect(isSafe([7, 6, 4, 2, 1])).toBeTruthy();
  expect(isSafe([1, 2, 7, 8, 9])).toBeFalsy();
  expect(isSafe([9, 7, 6, 2, 1])).toBeFalsy();
  expect(isSafe([1, 3, 2, 4, 5])).toBeFalsy();
  expect(isSafe([8, 6, 4, 4, 1])).toBeFalsy();
  expect(isSafe([1, 3, 6, 7, 9])).toBeTruthy();
});

test("isSafeWithSkip", () => {
  expect(isSafeWithSkip([7, 6, 4, 2, 1])).toBeTruthy();
  expect(isSafeWithSkip([1, 2, 7, 8, 9])).toBeFalsy();
  expect(isSafeWithSkip([9, 7, 6, 2, 1])).toBeFalsy();
  expect(isSafeWithSkip([1, 3, 2, 4, 5])).toBeTruthy();
  expect(isSafeWithSkip([8, 6, 4, 4, 1])).toBeTruthy();
  expect(isSafeWithSkip([1, 3, 6, 7, 9])).toBeTruthy();
});
