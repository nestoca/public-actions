import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    // Get inputs
    const glob = core.getInput('glob');
    const search = core.getInput('search');
    const replace = core.getInput('replace');

    // TODO
    console.log('glob: ' + glob);
    console.log('search: ' + search);
    console.log('replace: ' + replace);

    // Set outputs
    core.setOutput('changed', 'false');
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
