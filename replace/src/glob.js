//
// Adapted from https://github.com/tbjgolden/find-repl
// Copyright © Tom Golden
//
import { normalize } from 'node:path/posix';

const GLOBSTAR_REGEX = /(^|\/)\\\*\\\*(?:\/|$)/;
const WILDCARD_REGEX = /\\\*/;
const SET_REGEX = /\\{(.*)?(\\})/;
const COMMA_REGEX = /,/g;

export const globToRegex = (glob, basePath = process.cwd()) => {
  const isAbsolute = glob.startsWith('/');
  let regexSource = escapeStringForRegex(normalize(glob));

  let globstarMatch = regexSource.match(GLOBSTAR_REGEX);
  while (globstarMatch !== null) {
    const index = globstarMatch.index;
    if (index === undefined) break;
    regexSource =
      regexSource.slice(0, index) +
      globstarMatch[1] +
      '.*' +
      regexSource.slice(index + globstarMatch[0].length);
    globstarMatch = regexSource.match(GLOBSTAR_REGEX);
  }

  let wildcardMatch = regexSource.match(WILDCARD_REGEX);
  while (wildcardMatch !== null) {
    const index = wildcardMatch.index;
    if (index === undefined) break;
    regexSource =
      regexSource.slice(0, index) +
      '[^/]*' +
      regexSource.slice(index + wildcardMatch[0].length);
    wildcardMatch = regexSource.match(WILDCARD_REGEX);
  }

  let setMatch = regexSource.match(SET_REGEX);
  while (setMatch !== null) {
    const index = setMatch.index;
    if (index === undefined) break;
    regexSource =
      regexSource.slice(0, index) +
      '(?:' +
      setMatch[1].replace(COMMA_REGEX, '|') +
      ')' +
      regexSource.slice(index + setMatch[0].length);
    setMatch = regexSource.match(SET_REGEX);
  }

  return new RegExp(
    '^' +
      (isAbsolute ? '' : escapeStringForRegex(ensureEndsWithSlash(normalize(basePath)))) +
      regexSource +
      '$'
  );
};

const ESCAPE_REGEX = /[\t\n$()*+.?[\\\]^{|}]/g;
const replacer = (value) => {
  if (value === '\n') return '\\n';
  if (value === '\t') return '\\t';
  return '\\' + value;
};

export const escapeStringForRegex = (string) => {
  return string.replace(ESCAPE_REGEX, replacer);
};

export const ensureEndsWithSlash = (path) => {
  return path.endsWith('/') ? path : path + '/';
};
