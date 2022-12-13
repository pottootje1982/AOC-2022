import assignment from './index';

const stacks = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3
`;

describe('On Day 5', () => {
  it(`part 1`, () => {
    expect(assignment.partOne()).toBe('RLFNRTNFB');
  });

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe('MHQTLJRLB');
  });
});
