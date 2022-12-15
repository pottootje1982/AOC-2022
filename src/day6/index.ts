import { AssignmentBase } from '../day';
import * as R from 'ramda';

const getMarker = (str: string, markerLength: number = 4) => {
  const substrings = R.range(0, str.length - markerLength).map((i) =>
    str.substring(i, i + markerLength)
  );
  const lengths = R.pipe(R.map(R.pipe(R.split(''), R.uniq, R.length)))(
    substrings
  );
  return lengths.indexOf(markerLength) + markerLength;
};

class Assignment extends AssignmentBase<string> {
  constructor() {
    super(__dirname);
  }

  solveForPartOne(input: string): any {
    return getMarker(input);
  }

  solveForPartTwo(input: string): any {
    return getMarker(input, 14);
  }
}

export default new Assignment();
