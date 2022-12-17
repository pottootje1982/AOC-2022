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
  constructor(public nrRocks: number) {}
  floor = ['#######'];
  rock = rock1;
}

export const add = R.uncurryN(
  3,
  (rock: string[]) => (a: number, b: number) =>
    Math.max(Math.min(a + (b || 0), 7 - rock[0].length), 0)
);

export const stackEmpty = (start, length, lines: string[]): string[] => {
  const numberEmpty = Math.max(start, 0);
  const numberToRemove = Math.abs(Math.min(start, 0));
  const begin = [...nEmpty(numberEmpty), ...lines.slice(numberToRemove)];
  const end = length ? nEmpty(Math.max(length - begin.length, 0)) : [];
  return [...begin, ...end];
};

export const stackEmptyTop = (rock: string[], floor: string[]): string[] => {
  const nEmptyLines = floor.filter((x) => x === empty).length;
  const rockHeight = rock.length;
  const start = 3 + rockHeight - nEmptyLines;
  return stackEmpty(start, undefined, floor);
};

export const run = (state: State, directions: number[]): string[] => {
  let { rock, floor } = state;
  floor = stackEmptyTop(rock, floor);
  let overlay: string[], lastOverlay: string[];
  let pos = 2;
  let level = 0;
  let rockPadded;
  do {
    lastOverlay = overlay;
    rockPadded = padRock(rock, pos, level, floor.length);
    overlay = overlayN(rockPadded, floor);
    if (overlay.includes('')) break;

    const direction = directions[level];
    if (!direction) throw new Error('no direction');
    // blow left or right
    const posAfterWind = add(rock, pos, direction);
    const rockPaddedAfterWind = padRock(
      rock,
      posAfterWind,
      level,
      floor.length
    );
    const overlayAfterWind = overlayN(rockPaddedAfterWind, floor);
    if (!overlayAfterWind.includes('')) {
      pos = posAfterWind;
      overlay = overlayAfterWind;
      rockPadded = rockPaddedAfterWind;
    }
  } while (!overlay.includes('') && ++level);
  directions.splice(0, level);
  const index = rocks.indexOf(rock);
  rock = rocks[(index + 1) % rocks.length];
  state.nrRocks--;
  return { ...state, floor: lastOverlay, rock };
};

export const runAll = (directions: number[], nrRocks: number): string[] => {
  directions = R.flatten(R.repeat(directions, 1000));
  let state = new State(nrRocks);
  let floor;
  while (state.nrRocks > 0) {
    state = run(state, directions);
    floor = state.floor;
  }
  return floor;
};

const pad = R.curry((str, pos) =>
  str.padStart(pos + str.length, ' ').padEnd(7, ' ')
);
export const padRockTopC = (n) => R.map(pad(R.__, n));
export const padRockTop = R.uncurryN(2, padRockTopC);
export const padRock = (rock, left, top, height) => {
  const stackEmptyC = R.curry(stackEmpty);
  return R.pipe(padRockTop(left), stackEmptyC(top, height))(rock);
};

export const overlayOne = (a, b) => {
  if (!b) return a;
  if (!a) return b;
  const overlay = R.zipWith(
    (a, b) => (a === '#' && b === '#' ? 'x' : a === '#' ? a : b),
    a.split(''),
    b.split('')
  ).join('');
  if (overlay.includes('x')) return '';
  else return overlay;
};
export const overlayN = R.zipWith(overlayOne);

const directionToNum = (dir) => {
  return dir === '<' ? -1 : dir === '>' ? 1 : 0;
};

class Assignment extends AssignmentBase<number[]> {
  constructor() {
    super(__dirname, recursiveMap(R.split(''), directionToNum));
  }

  solveForPartOne(directions: number[]): any {
    const floor = runAll(directions, 2022);
    const height = floor.filter((x) => x !== empty).length;
    return height - 1;
  }

  solveForPartTwo(directions: number[]): any {}
}

export default new Assignment();
