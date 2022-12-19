// @ts-nocheck
import assignment, {
  overlayOne,
  noOverlap,
  overlayN,
  add,
  rock1,
  rock4,
  rock5,
  run,
  State,
  nEmpty,
  stackEmpty,
  stackEmptyTop,
  empty,
} from './index';

const rock = [`#`];
const floor = ['# ##', '####'];

describe('On Day 17', () => {
  it('overlayOne', () => {
    expect(overlayOne(1)('#', '# # ').join('')).toBe('### ');
  });

  it('adds', () => {
    expect(add(rock1, 1, 3)).toBe(3);
    expect(add(rock1, 1, -3)).toBe(0);
    expect(add(rock4, 5, -1)).toBe(4);
    expect(add(rock4, 5, 1)).toBe(6);
  });

  it('overlay', () => {
    expect(overlayN(1, 1, rock, stackEmpty(1, floor))).toEqual([
      undefined,
      '####'.split(''),
      '####',
    ]);
    expect(() => overlayN(2, rock, stackEmpty(1, floor))).toThrow();
  });

  it('tryOverlay2', () => {
    const lines = stackEmpty(3, floor);
    expect(noOverlap(0, 0, rock4, lines)).toBeFalsy();
    expect(noOverlap(0, 1, rock4, lines)).toBeTruthy();
    expect(noOverlap(1, 1, rock4, lines)).toBeFalsy();
    expect(noOverlap(2, 0, rock4, lines)).toBeFalsy();
  });

  it(`stackEmpty`, () => {
    expect(stackEmpty(1, rock)).toEqual([undefined, '#']);
    expect(stackEmpty(-1, [empty, empty, 'xxxx'])).toEqual([empty, 'xxxx']);
  });

  it(`stackEmptyTop`, () => {
    const lines = [empty, empty, '#######'];
    expect(stackEmptyTop(rock5, lines)).toEqual([...nEmpty(5), '#######']);
  });

  it(`run`, () => {
    const state = new State(1, [1, 1, 1, 1]);
    const { floor } = run(state);
    expect(floor).toEqual([empty, empty, empty, '   ####', '#######']);
  });

  it(`test input`, () => {
    expect(assignment.partOne(10)).toBe(17);
  });

  it(`real input part 1`, () => {
    expect(assignment.partTwo(20220)).toBe(3181);
  });

  xit(`part 2`, () => {
    expect(assignment.partTwo()).toBe(undefined);
  });
});
