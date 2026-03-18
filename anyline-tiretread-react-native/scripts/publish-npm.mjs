import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const registry = 'https://registry.npmjs.org/';
const token = (process.env.NPM_TOKEN || '').trim();

if (!token) {
  console.error('Missing NPM_TOKEN. Set it before running npm publish.');
  process.exit(1);
}

const tempDir = mkdtempSync(join(tmpdir(), 'anyline-npmjs-'));
const npmrcPath = join(tempDir, '.npmrc');
writeFileSync(
  npmrcPath,
  `//registry.npmjs.org/:_authToken=${token}\nregistry=${registry}\n`,
  { mode: 0o600 }
);

const result = spawnSync('npm', ['publish', '--registry', registry, '--access', 'public'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NPM_CONFIG_USERCONFIG: npmrcPath,
  },
});

rmSync(tempDir, { recursive: true, force: true });
process.exit(result.status ?? 1);
