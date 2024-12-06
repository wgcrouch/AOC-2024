import { expect, test } from "vitest";
import { day6part1, day6part2 } from "./day6";
import { day6input } from "../input";

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

test.only("day 6 part 1 example 1", () => {
  expect(day6part1(day6Example1)).toEqual(143);
});

test("day 6 part 1 real", () => {
  expect(day6part1(day6input)).toEqual(4774);
});

test("day 6 part 2 example", () => {
  expect(day6part2(day6Example1)).toEqual(123);
});

test("day 6 part 2 real", () => {
  expect(day6part2(day6input)).toEqual(6004);
});
