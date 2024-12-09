import { describe, expect, test } from "vitest";
import { day9part1, day9part2 } from "./day9";
import { day9input } from "../input/day9";

const day9Example1 = `2333133121414131402`;

const day9Example2 = ``;

describe("day 9", () => {
  test("day 9 part 1 example 1", () => {
    expect(day9part1(day9Example1)).toEqual(1928);
  });

  test("day 9 part 1 real", () => {
    expect(day9part1(day9input)).toEqual(6288707484810);
  });

  test("day 9 part 2 example 1", () => {
    expect(day9part2(day9Example1)).toEqual(2858);
  });

  test("day 9 part 2 real", () => {
    expect(day9part2(day9input)).toEqual(6311837662089);
  });
});
