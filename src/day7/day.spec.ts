import assignment from './index';

describe('On Day 7', () => {
  it(`part 1`, () => {
    expect(assignment.partOne()).toBe(1391690);
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe(5469168);
  });
});
