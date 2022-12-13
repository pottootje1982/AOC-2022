import { AssignmentBase, recursiveMap } from '../day';
import * as R from 'ramda';
import { split } from 'ramda';

const tower = (str: string) =>
  !str.includes('[') && !str.includes(']') && str.trim() !== '';

const getTowers = R.pipe(
  R.dropLast(1) as any,
  R.map(R.split('')),
  R.transpose,
  R.map(R.join('')),
  R.filter(tower),
  R.map(R.trim),
  R.map(R.split(''))
);

interface Instruction {
  count: number;
  from: number;
  to: number;
}

const instruction = (parts: number[]): Instruction => ({
  count: parts[1],
  from: parts[3] - 1,
  to: parts[5] - 1,
});

const getInstructions = R.pipe(
  recursiveMap(R.identity, split(' '), Number),
  R.map(instruction)
);

const transfer1 = (instruction: Instruction, towers: string[][]) => {
  const { from, to } = instruction;
  const fromTower = towers[from];
  const toTower = towers[to];
  const element = fromTower.shift() as string;
  toTower.unshift(element);
  return towers;
};

const transfer = (towers: string[][], instruction: Instruction) => {
  const { from, to, count } = instruction;
  const fromTower = towers[from];
  const toTower = towers[to];
  const elems = fromTower.splice(0, count);
  toTower.unshift(...elems);
  return towers;
};

const transferN = (towers: string[][], instruction: Instruction) => {
  R.range(0, instruction.count).forEach(() => transfer1(instruction, towers));
  return towers;
};

const solve = (
  towersStr: string[],
  instructionsStr: string[],
  transferFn: any = transferN
) => {
  const towers = getTowers(towersStr);
  const instructions = getInstructions(instructionsStr);
  const result = R.reduce(transferFn, towers, instructions);
  const takeFirst = R.map(R.take(1));
  return R.pipe(takeFirst, R.flatten, R.join(''))(result);
};

class Assignment extends AssignmentBase<string[][]> {
  constructor() {
    super(5, recursiveMap(R.split('\n\n'), R.split('\n')));
  }

  solveForPartOne([towersStr, instructionsStr]: string[][]): any {
    return solve(towersStr, instructionsStr);
  }

  solveForPartTwo([towers, instructions]: string[][]): any {
    return solve(towers, instructions, transfer);
  }
}

export default new Assignment();
