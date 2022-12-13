import assignment from './index';

describe('On Day 5', () => {
  it(`part 1`, () => {
    expect(assignment.partOne()).toBe('RLFNRTNFB');
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe('MHQTLJRLB');
  });
});
