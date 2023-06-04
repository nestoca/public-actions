const core = require('@actions/core');

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
  core.setFailed(error.message);
}
