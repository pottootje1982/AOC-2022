import assignment from './index';

describe('On Day 10', () => {
  it(`part 1`, () => {
    expect(assignment.partOne().strength).toBe(15880);
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe(undefined);
  });
});
