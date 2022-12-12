import fs from 'fs';

abstract class AssignmentBase<TInput> {
  id: number;
  transform: (arg: string) => TInput;

  constructor(id: number, transform: (arg: string) => any) {
    this.id = id;
    this.transform = transform;
  }

  partOne(): string {
    const content = fs
      .readFileSync(`./src/day${this.id}/inputs/part1.txt`)
      .toString();
    const result = this.solveForPartOne(this.transform(content));
    return result;
  }

  abstract solveForPartOne(content: TInput): string;

  partTwo(): string {
    const content = fs
      .readFileSync(`./src/day${this.id}/inputs/part2.txt`)
      .toString();
    const result = this.solveForPartTwo(this.transform(content));
    return result;
  }

  abstract solveForPartTwo(content: TInput): string;
}

export { AssignmentBase };
