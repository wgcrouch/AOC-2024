import { describe, expect, test } from "vitest";
import { day12part1, day12part2 } from "./day12";
import { day12input } from "../input/day12";

const day12Example1 = `
AAAA
BBCD
BBCC
EEEC`.trim();

const day12Example2 = `
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`.trim();

const day12Example3 = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`.trim();

const day12Example4 = `
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`.trim();

const day12Example5 = `
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`.trim();

describe("day 12", () => {
  test("day 12 part 1 example", () => {
    expect(day12part1(day12Example1)).toEqual(140);
    expect(day12part1(day12Example2)).toEqual(772);
    expect(day12part1(day12Example3)).toEqual(1930);
  });

  test("day 12 part 1 real", () => {
    expect(day12part1(day12input)).toEqual(1361494);
  });

  test("day 12 part 2 example ", () => {
    expect(day12part2(day12Example1)).toEqual(80);
    expect(day12part2(day12Example4)).toEqual(236);
    expect(day12part2(day12Example5)).toEqual(368);
    expect(day12part2(day12Example3)).toEqual(1206);
  });

  test("day 12 part 2 real", () => {
    expect(day12part2(day12input)).toEqual(830516);
  });
});
