import { describe, expect, test } from "vitest";
import { day11part1, day11part2 } from "./day11";
import { day11input } from "../input/day11";

const day11Example1 = `125 17`;

describe("day 11", () => {
  test("day 11 part 1 example", () => {
    expect(day11part1(day11Example1)).toEqual(55312);
  });

  test("day 11 part 1 real", () => {
    expect(day11part1(day11input)).toEqual(218079);
  });

  test("day 11 part 2 example 1", () => {
    expect(day11part2(day11Example1)).toEqual(65601038650482);
  });

  test("day 11 part 2 real", () => {
    expect(day11part2(day11input)).toEqual(259755538429618);
  });
});
