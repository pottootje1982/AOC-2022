import { AssignmentBase, recursiveMap } from '../day';
import * as R from 'ramda';
import { split } from 'ramda';

const isContained = ([range1, range2]: number[][]) => {
  return range1[0] >= range2[0] && range1[1] <= range2[1];
};
const mutContained = ([range1, range2]: number[][]) =>
  isContained([range1, range2]) || isContained([range2, range1]);

const overlap = ([range1, range2]: number[][]) => {
  return (
    (range1[0] >= range2[0] && range1[0] <= range2[1]) ||
    (range1[1] >= range2[0] && range1[1] <= range2[1])
  );
};
const mutOverlap = ([range1, range2]: number[][]) =>
  overlap([range1, range2]) || overlap([range2, range1]);

class Assignment extends AssignmentBase<number[][][]> {
  constructor() {
    super(__dirname, recursiveMap(split('\n'), split(','), split('-'), Number));
  }

  solveForPartOne(content: number[][][]): any {
    const solution = R.map(R.pipe(mutContained, (a) => (a ? 1 : 0)));
    return R.sum(solution(content));
  }

  solveForPartTwo(content: number[][][]): any {
    const solution = R.map(R.pipe(mutOverlap, (a) => (a ? 1 : 0)));
    return R.sum(solution(content));
  }
}

export default new Assignment();
