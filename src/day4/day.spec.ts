import assignment from './index';

describe('On Day 4', () => {
  it(`part 1`, () => {
    expect(assignment.partOne()).toBe(511);
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe(821);
  });
});
