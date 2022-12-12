import day1 from './index';

describe('On Day 1', () => {
  it(`max calories`, () => {
    expect(day1.partOne()).toBe(69206);
  });

  it(`sum of max 3`, () => {
    expect(day1.partTwo()).toBe(197400);
  });
});
