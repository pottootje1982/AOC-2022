import assignment from './index';

describe('On Day 10', () => {
  it(`part 1`, () => {
    expect(assignment.partOne()).toBe(15880);
  });

  const expected = `
###..#.....##..####.#..#..##..####..##..
#..#.#....#..#.#....#.#..#..#....#.#..#.
#..#.#....#....###..##...#..#...#..#....
###..#....#.##.#....#.#..####..#...#.##.
#....#....#..#.#....#.#..#..#.#....#..#.
#....####..###.#....#..#.#..#.####..###.
`;

  it(`part 2`, () => {
    expect(assignment.partTwo()).toBe(expected);
  });
});
