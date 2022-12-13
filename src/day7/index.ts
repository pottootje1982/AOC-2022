import { AssignmentBase, recursiveMap } from '../day';
import * as R from 'ramda';

interface Command {
  command: string;
  files: File[];
  dir: string;
  size: number;
}

interface File {
  name: string;
  size: number;
  type: string;
}

const parseListing = (input: string): File => {
  const [size, name] = input.split(' ');
  return {
    name,
    size: Number(size) || 0,
    type: size === 'dir' ? 'dir' : 'file',
  };
};

const parse = (input: string): Command => {
  const [entireCommand, output] = input.split(/\n(.*)/s);
  const [command, dir] = entireCommand.split(' ');
  const files = output && recursiveMap(R.split('\n'), parseListing)(output);
  return { command, files, dir } as Command;
};

const path = (dirs: string[]) => dirs.join('/').slice(1) || '/';

const scan = (result: Result, comm: Command) => {
  const { dirs, listing } = result;
  const { command, files, dir } = comm;
  const currDirStr = path(dirs);
  const currDir = listing.find((f) => f.name === currDirStr) as File;
  if (command === 'ls') {
    const size = R.sum(files.map((f) => f.size));
    if (currDir) currDir.size = size;
  } else if (command === 'cd' && dir === '..') {
    dirs.pop();
    const parentDir = path(dirs);
    const parent = listing.find((f) => f.name === parentDir);
    if (parent && currDir) parent.size += currDir.size;
    else throw new Error(`No current directory ${parentDir} ${currDir}}`);
  } else if (command === 'cd' && dir !== '..') {
    dirs.push(dir);
    listing.push({ name: path(dirs) } as File);
  }
  return result;
};

interface Result {
  dirs: string[];
  listing: File[];
}

class Assignment extends AssignmentBase<Command[]> {
  constructor() {
    super(7, recursiveMap(R.split('$ '), parse));
  }

  solveForPartOne(input: Command[]): any {
    const { listing } = R.reduce(scan, { dirs: [], listing: [] }, input);
    return R.sum(listing.filter((f) => f.size < 100000).map((f) => f.size));
  }

  solveForPartTwo(input: Command[]): any {
    const result = R.reduce(scan, { dirs: [], listing: [] }, input);
    const remainingCommands = R.repeat(
      { command: 'cd', dir: '..' } as Command,
      result.dirs.length - 1
    );
    const { listing, dirs } = R.reduce(scan, result, remainingCommands);
    const sizes = listing.map((f) => f.size);
    sizes.sort((a: number, b: number) => a - b);
    const root = sizes[sizes.length - 1];
    const toFree = 30000000 - (70000000 - root);
    return sizes.filter((s) => s >= toFree)[0];
  }
}

export default new Assignment();
