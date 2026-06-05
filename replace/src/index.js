import { getInput, setFailed, setOutput } from './actions.js';
import { findRepl } from './replace.js';

async function run() {
  try {
    const workDir = getInput('work-dir');
    const glob = getInput('glob');
    const search = getInput('search');
    const replace = getInput('replace');
    const regex = getInput('regex');

    process.chdir(workDir);

    if (regex != 'true' && regex != 'false') {
      setFailed('`regex` input must be either "true" or "false"');
      return;
    }

    const searchExp = regex == 'true' ? new RegExp(search, 'gm') : search;
    const changes = await findRepl(searchExp, replace, glob);

    setOutput('changes', changes.map(x => `"${x}"`).join(' '));
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
}

run();
