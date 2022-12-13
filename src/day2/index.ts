import { AssignmentBase } from '../day';
import * as R from 'ramda';

const scores: { [key: string]: number } = {
  'A X': 3,
  'A Y': 6,
  'A Z': 0,
  'B X': 0,
  'B Y': 3,
  'B Z': 6,
  'C X': 6,
  'C Y': 0,
  'C Z': 3,
};

const shape: { [key: string]: number } = {
  X: 1,
  Y: 2,
  Z: 3,
};

class Assignment extends AssignmentBase<string[]> {
  constructor() {
    super(2, R.split('\n'));
  }

  solveForPartOne(content: string[]): any {
    const getScore = (strat: string) => scores[strat] + shape[strat[2]];
    const getSolution = R.pipe(R.map(getScore), R.sum);
    return getSolution(content);
  }

  solveForPartTwo(content: string[]): any {
    const getScore = (strat: string) =>
      shape[shape2[strat]] + resultScore[strat[2]];
    const getSolution = R.pipe(R.map(getScore), R.sum);
    return getSolution(content);
  }
}

const shape2: { [key: string]: string } = {
  'A X': 'Z',
  'A Y': 'X',
  'A Z': 'Y',
  'B X': 'X',
  'B Y': 'Y',
  'B Z': 'Z',
  'C X': 'Y',
  'C Y': 'Z',
  'C Z': 'X',
};

const resultScore: { [key: string]: number } = {
  X: 0,
  Y: 3,
  Z: 6,
};

export default new Assignment();
