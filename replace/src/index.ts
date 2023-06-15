import * as core from '@actions/core';
import { findRepl } from './replace';

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
    const searchExp = regex == 'true' ? new RegExp(search, 'gm') : search;
    const changes = await findRepl(searchExp, replace, glob);

    // Set outputs
    core.setOutput('changes', changes.map(x => `"${x}"`).join(" "));
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
