import { describe, expect, test } from "vitest";
import { day10part1, day10part2 } from "./day10";
import { day10input } from "../input/day10";

const day10Example1 = `0123
1234
8765
9876`;

const day10Example2 = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;

const day10Example3 = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;

const day10Example4 = `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`;

const day10Example5 = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

describe("day 10", () => {
  test("day 10 part 1 example", () => {
    expect(day10part1(day10Example1)).toEqual(1);
    expect(day10part1(day10Example2)).toEqual(2);
    expect(day10part1(day10Example3)).toEqual(4);
    expect(day10part1(day10Example4)).toEqual(3);
    expect(day10part1(day10Example5)).toEqual(36);
  });

  test("day 10 part 1 real", () => {
    expect(day10part1(day10input)).toEqual(552);
  });

  test("day 10 part 2 example 1", () => {
    expect(day10part2(day10Example5)).toEqual(81);
  });

  test("day 10 part 2 real", () => {
    expect(day10part2(day10input)).toEqual(1225);
  });
});
