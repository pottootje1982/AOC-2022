import assignment from './index';

describe('On Day 6', () => {
  it(`part 1`, () => {
    expect(assignment.partOne()).toBe(1531);
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe(2518);
  });
});
