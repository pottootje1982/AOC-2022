import { AssignmentBase } from '../day';
import * as R from 'ramda';

class Assignment extends AssignmentBase<string[]> {
  constructor() {
    super(3, R.split('\n'));
  }

  solveForPartOne(content: string[]): any {
    return 0;
  }

  solveForPartTwo(content: string[]): any {
    return 0;
  }
}

export default new Assignment();
