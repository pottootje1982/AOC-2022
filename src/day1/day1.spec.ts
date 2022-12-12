import assignment from './index';

describe('On Day 1', () => {
  it(`max calories`, () => {
    expect(assignment.partOne()).toBe(69206);
  });

  it(`sum of max 3`, () => {
    expect(assignment.partTwo()).toBe(197400);
  });
});
