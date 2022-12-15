import { AssignmentBase, recursiveMap } from '../day';
import * as R from 'ramda';

class Assignment extends AssignmentBase<number[][]> {
  constructor() {
    super(__dirname, recursiveMap(R.split('\n'), R.split(''), Number));
  }

  solveForPartOne(map: number[][]): any {
    let count = 0;
    for (let i = 1; i < map.length - 1; i++) {
      for (let j = 1; j < map[i].length - 1; j++) {
        let curr = map[i][j];
        if (
          map[i - 1][j] < curr &&
          map[i + 1][j] < curr &&
          map[i][j - 1] < curr &&
          map[i][j + 1] < curr
        ) {
          curr++;
        }
      }
    }
    return count;
  }

  solveForPartTwo(map: number[][]): any {}
}

export default new Assignment();
