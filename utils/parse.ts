export function splitToNumber(delimeter: string = "") {
  return (input: string): Array<number> =>
    input.split(delimeter).map((x) => parseInt(x));
}
