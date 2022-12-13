import assignment from './index';

describe('On Day 3', () => {
  it(`part 1`, () => {
    expect(assignment.partOne()).toBe(7785);
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe(2633);
  });
});
