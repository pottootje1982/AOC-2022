import { AssignmentBase } from '../day';
import * as R from 'ramda';
import { randomBytes } from 'crypto';

const score = (c: string): number => {
  const charValue = c.charCodeAt(0);
  return charValue - (charValue >= 65 && charValue <= 95 ? 38 : 96);
};

const split = (str: string) => [
  str.slice(0, str.length / 2),
  str.slice(str.length / 2),
];

const toArray = (str: string) => [...str];

const filterDouble = ([str1, str2]: string[]) =>
  [...str1].filter((c) => str2.includes(c));

const containedInAll = ([str1, str2, str3]: string[][]) =>
  str1.filter((c) => str2.includes(c) && str3.includes(c));

class Assignment extends AssignmentBase<string[]> {
  constructor() {
    super(3, R.split('\n'));
  }

  solveForPartOne(content: string[]): any {
    const doubles = R.map(
      R.pipe(split, filterDouble, R.uniq, R.map(score), R.sum)
    );
    const getSolution = R.pipe(doubles, R.sum);
    return getSolution(content);
  }

  solveForPartTwo(content: string[]): any {
    const groups = R.range(0, content.length / 3).map((i) => [
      content[i * 3],
      content[i * 3 + 1],
      content[i * 3 + 2],
    ]) as string[][];
    const triples = R.map(R.pipe(toArray, R.uniq));
    const unique = R.map(R.pipe(triples, containedInAll, R.map(score), R.sum));
    return R.pipe(unique, R.sum)(groups);
  }
}

export default new Assignment();
