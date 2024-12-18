import { expect, test } from "vitest";
import { day6part1, day6part2 } from "./day6";
import { day6input } from "../input/day6";

const day6Example1 = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

test("day 6 part 1 example 1", () => {
  expect(day6part1(day6Example1)).toEqual(41);
});

test("day 6 part 1 real", () => {
  expect(day6part1(day6input)).toEqual(4665);
});

test("day 6 part 2 example", () => {
  expect(day6part2(day6Example1)).toEqual(6);
});

test("day 6 part 2 real", () => {
  expect(day6part2(day6input)).toEqual(1688);
});
