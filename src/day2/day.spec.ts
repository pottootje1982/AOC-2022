import assignment from './index';

describe('On Day 2', () => {
  it(`part 1`, () => {
    expect(assignment.partOne()).toBe(10595);
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe(9541);
  });
});
