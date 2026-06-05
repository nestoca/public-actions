import { appendFileSync } from 'node:fs';

export function getInput(name) {
  return (process.env[`INPUT_${name.toUpperCase().replace(/ /g, '_')}`] ?? '').trim();
}

function escapeData(s) {
  return s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}

export function setFailed(msg) {
  process.stdout.write(`::error::${escapeData(msg)}\n`);
  process.exit(1);
}

export function setOutput(name, value) {
  appendFileSync(process.env['GITHUB_OUTPUT'], `${name}=${value}\n`);
}
