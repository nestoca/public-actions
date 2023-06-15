//
// Adapted from https://github.com/tbjgolden/find-repl
// Copyright © Tom Golden
//
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { globToRegex } from './glob';

const escapeStringForRegex = (str: string): string => {
  return str.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
};

const replaceAll = (str: string, from: string | RegExp, to: string) => {
  return from instanceof RegExp
    ? str.replace(
        from.global ? from : new RegExp(from.source, from.flags + 'g'),
        to
      )
    : str.replace(new RegExp(escapeStringForRegex(from), 'g'), to);
};

export const findRepl = async (
  find: string | RegExp,
  replace: string,
  inFilesMatching = '**/*'
): Promise<string[]> => {
  const fileMatcherRegex = globToRegex(inFilesMatching, '');
  let changes: string[] = [];

  for (const file of execSync(
    'git ls-files --cached --others --exclude-standard'
  )
    .toString()
    .split('\n')
    .filter(Boolean)) {
    try {
      if (fileMatcherRegex.test('./' + file)) {
        const input = await readFile(file, 'utf8');
        const output = replaceAll(input, find, replace);
        if (output != input) {
          console.log('Changed: ' + file);
          changes.push(file);
        }

        await writeFile(file, output);
      }
    } catch (error) {
      if (error instanceof Error) {
        if ('code' in error && error.code === 'ENOENT') {
          continue;
        }
        throw error;
      }
    }
  }

  if (changes.length == 0) {
    console.log('No file changed.');
  }

  return changes;
};
