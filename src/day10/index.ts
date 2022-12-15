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

const compute = (state: State, comm: Command): State => {
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

class Assignment extends AssignmentBase<Command[]> {
  constructor() {
    super(__dirname, recursiveMap(R.split('\n'), parseCommand));
  }

  solveForPartOne(commands: Command[]): any {
    return R.reduce(
      compute,
      { cycle: 0, value: 1, interval: -20, strength: 0 },
      commands
    );
  }

  solveForPartTwo(map: Command[]): any {}
}

export default new Assignment();
