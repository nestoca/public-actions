import * as core from '@actions/core';
import { findRepl } from 'find-repl';

async function run(): Promise<void> {
  try {
    // Get inputs
    const glob = core.getInput('glob');
    const search = core.getInput('search');
    const replace = core.getInput('replace');
    const regex = core.getInput('regex');

    // Validate inputs
    if (regex != 'true' && regex != 'false') {
      core.setFailed('`regex` input must be either "true" or "false"');
      return;
    }

    // Perform search & replace
    const searchExp = regex == 'true' ? new RegExp(search, '') : search;
    await findRepl(searchExp, replace, glob);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
