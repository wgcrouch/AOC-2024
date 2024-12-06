import { expect, test } from "vitest";
import { day3part1, day3part2 } from "./day3";
import { day3input } from "../input";

const day3Example1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

test("day 3 part 1 example", () => {
  expect(day3part1(day3Example1)).toEqual(161);
});

test("day 3 part 1 real", () => {
  expect(day3part1(day3input)).toEqual(174336360);
});

const day3Example2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
test("day 3 part 2 example", () => {
  expect(day3part2(day3Example2)).toEqual(48);
});

test("day 3 part 2 real", () => {
  expect(day3part2(day3input)).toEqual(88802350);
});
