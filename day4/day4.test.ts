import { expect, test } from "vitest";
import { day4part1, day4part2 } from "./day4";
import { day4input } from "../input";

const day4Example1 = `
..X...
.SAMX.
.A..A.
XMAS.S
.X....`;

const day4Example2 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

test("day 4 part 1 example 1", () => {
  expect(day4part1(day4Example1)).toEqual(4);
});

test("day 4 part 1 example 2", () => {
  expect(day4part1(day4Example2)).toEqual(18);
});

test("day 4 part 1 real", () => {
  expect(day4part1(day4input)).toEqual(2554);
});

test("day 4 part 2 example", () => {
  expect(day4part2(day4Example2)).toEqual(9);
});

test("day 4 part 2 real", () => {
  expect(day4part2(day4input)).toEqual(1916);
});
