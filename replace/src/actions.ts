import * as fs from 'fs';

export function getInput(name: string): string {
  return (process.env[`INPUT_${name.toUpperCase().replace(/ /g, '_')}`] ?? '').trim();
}

function escapeData(s: string): string {
  return s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}

export function setFailed(msg: string): void {
  process.stdout.write(`::error::${escapeData(msg)}\n`);
  process.exit(1);
}

export function setOutput(name: string, value: string): void {
  fs.appendFileSync(process.env['GITHUB_OUTPUT']!, `${name}=${value}\n`);
}
