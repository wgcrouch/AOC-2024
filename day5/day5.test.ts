import { expect, test } from "vitest";
import { day5part1, day5part2 } from "./day5";
import { day5input } from "../input/day5";

const day5Example1 = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

test("day 5 part 1 example 1", () => {
  expect(day5part1(day5Example1)).toEqual(143);
});

test("day 5 part 1 real", () => {
  expect(day5part1(day5input)).toEqual(4774);
});

test("day 5 part 2 example", () => {
  expect(day5part2(day5Example1)).toEqual(123);
});

test("day 5 part 2 real", () => {
  expect(day5part2(day5input)).toEqual(6004);
});
