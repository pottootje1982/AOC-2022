import fs from 'fs';
import { map, pipe, identity } from 'ramda';

export type anyFunc = (_: any) => any;

export const recursiveMap = (...fns: anyFunc[]): anyFunc =>
  fns.length === 1 ? fns[0] : pipe(fns[0], map(recursiveMap(...fns.slice(1))));

abstract class AssignmentBase<TInput> {
  path: string;
  transform: (arg: string) => TInput;

  constructor(path: string, transform: (arg: string) => any = identity) {
    this.path = path;
    this.transform = transform;
  }

  partOne(): string {
    const content = fs.readFileSync(`${this.path}/inputs/part1.txt`).toString();
    const result = this.solveForPartOne(this.transform(content));
    return result;
  }

  abstract solveForPartOne(content: TInput): string;

  partTwo(): string {
    const content = fs.readFileSync(`${this.path}/inputs/part2.txt`).toString();
    const result = this.solveForPartTwo(this.transform(content));
    return result;
  }

  abstract solveForPartTwo(content: TInput): string;
}

export { AssignmentBase };
