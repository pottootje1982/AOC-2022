import { AssignmentBase, recursiveMap } from '../day';
import * as R from 'ramda';

interface Command {
  command: string;
  amount: number;
}

const parseCommand = (comm: string) => {
  const [command, amount] = comm.split(' ');
  return { command, amount: Number(amount) };
};

interface State {
  cycle: number;
  value: number;
  interval: number;
  strength: number;
}

const intervalCheck = 40;

const part1 = (state: State, comm: Command): State => {
  const { value, interval } = state;
  const { command, amount } = comm;
  const newState = { ...state };
  switch (command) {
    case 'addx':
      newState.cycle += 2;
      newState.value += amount;
      break;
    case 'noop':
      newState.cycle += 1;
      break;
    default:
      throw new Error(`Unknown command ${command}`);
  }
  if (newState.cycle - intervalCheck >= interval) {
    newState.interval += intervalCheck;
    newState.strength += newState.interval * value;
  }
  return newState;
};

class Screen {
  cycle: number = 0;
  value: number = 1;
  output: string = '';
}

const part2 = (state: Screen, comm: Command): Screen => {
  const { cycle, value, output } = state;
  let { command, amount } = comm;
  const newState = { ...state };
  let cycles = 1;
  switch (command) {
    case 'addx':
      cycles = 2;
      break;
    case 'noop':
      amount = 0;
      break;
    default:
      throw new Error(`Unknown command ${command}`);
  }
  for (let i = 0; i < cycles; i++) {
    newState.output += Math.abs(newState.cycle - value) <= 1 ? '#' : '.';
    if (newState.cycle % 40 === 39) {
      newState.output += '\n';
      newState.cycle = 0;
    } else {
      newState.cycle++;
    }
  }
  newState.value += amount;
  return newState;
};

class Assignment extends AssignmentBase<Command[]> {
  constructor() {
    super(__dirname, recursiveMap(R.split('\n'), parseCommand));
  }

  solveForPartOne(commands: Command[]): any {
    return R.reduce(
      part1,
      { cycle: 0, value: 1, interval: -20, strength: 0 },
      commands
    ).strength;
  }

  solveForPartTwo(commands: Command[]): any {
    return R.reduce(part2, { cycle: 0, value: 1, output: '\n' }, commands)
      .output;
  }
}

export default new Assignment();
