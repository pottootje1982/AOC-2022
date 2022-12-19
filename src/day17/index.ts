// @ts-nocheck
import { AssignmentBase, recursiveMap } from '../day';
import * as R from 'ramda';

export const rock1 = ['####'];
export const rock2 = [' # ', '###', ' # '];
export const rock3 = ['  #', '  #', '###'];
export const rock4 = ['#', '#', '#', '#'];
export const rock5 = ['##', '##'];
const rocks = [rock1, rock2, rock3, rock4, rock5];

export const empty = undefined;
export const nEmpty = R.repeat(empty);

export class State {
  constructor(public nrRocks: number, private directions: number[]) {}
  rockIndex = -1;
  directionIndex = -1;
  floor = ['#######'];

  get rock() {
    return rocks[(this.rockIndex = (this.rockIndex + 1) % rocks.length)];
  }

  get direction() {
    return this.directions[
      (this.directionIndex = (this.directionIndex + 1) % this.directions.length)
    ];
  }
}

export const add = R.uncurryN(
  3,
  (rock: string[]) => (a: number, b: number) =>
    Math.max(Math.min(a + (b || 0), 7 - rock[0].length), 0)
);

export const stackEmpty = (start, lines: string[]): string[] => {
  const numberEmpty = Math.max(start, 0);
  const numberToRemove = Math.abs(Math.min(start, 0));
  return [...nEmpty(numberEmpty), ...lines.slice(numberToRemove)];
};

export const stackEmptyTop = (rock: string[], floor: string[]): string[] => {
  const nEmptyLines = floor.filter((x) => x === empty).length;
  const rockHeight = rock.length;
  const start = 3 + rockHeight - nEmptyLines;
  return stackEmpty(start, floor);
};

export const run = (state: State): string[] => {
  let { floor } = state;
  const rock = state.rock;
  floor = stackEmptyTop(rock, floor);
  let overlay = true;
  let pos = 2,
    level = 0;
  do {
    let overlay = noOverlap(level, pos, rock, floor);
    if (!overlay) break;

    const direction = state.direction;
    if (!direction) throw new Error('no direction');
    // blow left or right
    const posAfterWind = add(rock, pos, direction);
    overlay = noOverlap(level, posAfterWind, rock, floor);
    if (overlay) {
      pos = posAfterWind;
    }
  } while (overlay && ++level);
  state.floor = overlayN(level - 1, pos, rock, floor);
  state.nrRocks--;

  return state;
};

export const runAll = (directions: number[], nrRocks: number): string[] => {
  let state = new State(nrRocks, directions);
  let floor;
  while (state.nrRocks > 0) {
    state = run(state);
    floor = state.floor;
  }
  return floor;
};

const pad = R.curry((str, pos) => {
  return str.padStart(pos + str.length, ' ').padEnd(7, ' ');
});

export const overlayOne = (pos) => (rock, line) => {
  rock = pad(rock, pos);
  if (!line) return rock;
  if (!rock) return line;
  return R.zipWith((a, b) => (a === '#' ? a : b), rock, line);
};
export const tryOverlayOne = (pos) => (rock, line) => {
  if (!line) return rock;
  if (!rock) return line;
  const b = line.slice(pos);
  for (let i = 0; i < rock.length; i++) {
    if (rock[i] === '#' && b[i] === '#') return false;
  }
};
export const noOverlap = (level, pos, rock, lines) => {
  const overlay = R.zipWith(tryOverlayOne(pos), rock, lines.slice(level));
  return !overlay.includes(false);
};
export const overlayN = (level, pos, rock, lines) => {
  const overlay = R.zipWith(overlayOne(pos), rock, lines.slice(level));
  if (overlay.includes(null)) throw new Error('overlay null');
  lines.splice(level, rock.length, ...overlay);
  return lines;
};

const directionToNum = (dir) => {
  return dir === '<' ? -1 : dir === '>' ? 1 : 0;
};

class Assignment extends AssignmentBase<number[]> {
  constructor() {
    super(__dirname, recursiveMap(R.split(''), directionToNum));
  }

  solveForPartOne(directions: number[], nrRocks): any {
    const floor = runAll(directions, nrRocks);
    const height = floor.filter((x) => x !== empty).length;
    return height - 1;
  }

  solveForPartTwo(directions: number[], nrRocks): any {
    const floor = runAll(directions, nrRocks);
    const height = floor.filter((x) => x !== empty).length;
    return height - 1;
  }
}

export default new Assignment();
