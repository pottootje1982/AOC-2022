// @ts-nocheck
import assignment, {
  overlayOne,
  overlayN,
  padRockTop,
  add,
  rock1,
  rock4,
  rock5,
  run,
  State,
  nEmpty,
  stackEmpty,
  stackEmptyTop,
} from './index';

const t = (a) => a.split('\n').slice(1);

const lines1 = t(`
# ##
####`);

const lines2 = [` #  `];

describe('On Day 17', () => {
  it('pads rock', () => {
    const expected = t(`
   # ##
   ####`);
    expect(padRockTop(3, lines1)).toEqual(expected);
  });

  it('overlays', () => {
    expect(overlayOne('# # ', ' #  ')).toBe('### ');
  });

  it('adds', () => {
    expect(add(rock1, 1, 3)).toBe(3);
    expect(add(rock1, 1, -3)).toBe(0);
    expect(add(rock4, 5, -1)).toBe(4);
    expect(add(rock4, 5, 1)).toBe(6);
  });

  it('overlayN', () => {
    const expected = t(`
####
####`);
    expect(
      overlayN(stackEmpty(1, 3, lines2), stackEmpty(1, undefined, lines1))
    ).toEqual([undefined, ...expected]);
  });

  it.only(`stackEmpty`, () => {
    expect(stackEmpty(1, 3, lines2)).toEqual([undefined, ' #  ', undefined]);
    expect(stackEmpty(-1, undefined, [undefined, undefined, 'xxxx'])).toEqual([
      undefined,
      'xxxx',
    ]);
  });

  it(`stackEmptyTop`, () => {
    const lines = [...nEmpty(2), '#######'];
    expect(stackEmptyTop(rock5, lines)).toEqual([...nEmpty(5), '#######']);
  });

  it(`run`, () => {
    const state = new State();
    const directions = [1, 1, 1, 1];
    const { floor } = run(state, directions);
    expect(floor).toEqual([
      undefined,
      undefined,
      undefined,
      '   ####',
      '#######',
    ]);
    expect(directions).toEqual([]);
  });

  it.only(`part 1`, () => {
    expect(assignment.partOne()).toBe(3181);
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe(undefined);
  });
});
