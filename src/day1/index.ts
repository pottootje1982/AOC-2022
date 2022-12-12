import { AssignmentBase } from '../day';
import { split, pipe, map, sum } from 'ramda';

class Assignment extends AssignmentBase<number[][]> {
  constructor() {
    super(1, pipe(split('\n\n'), map(pipe(split('\n'), map(Number)))));
  }

  solveForPartOne(content: number[][]): any {
    const solution = map(sum);
    return Math.max(...solution(content));
  }

  solveForPartTwo(content: number[][]): any {
    const solution = map(sum)(content);
    solution.sort((a, b) => b - a);
    return sum(solution.slice(0, 3));
  }
}

export default new Assignment();
