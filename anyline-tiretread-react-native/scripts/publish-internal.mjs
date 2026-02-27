import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const projectId = process.env.CI_PROJECT_ID;
const defaultRegistry = projectId
  ? `https://gitlab.com/api/v4/projects/${projectId}/packages/npm/`
  : '';
const registry = (process.env.INTERNAL_NPM_REGISTRY || defaultRegistry).trim();
const token = (process.env.NPM_TOKEN || process.env.CI_JOB_TOKEN || '').trim();

if (!registry) {
  console.error(
    'Missing registry. Set INTERNAL_NPM_REGISTRY or run in GitLab CI with CI_PROJECT_ID.'
  );
  process.exit(1);
}

if (!token) {
  console.error(
    'Missing token. Set NPM_TOKEN (local) or ensure CI_JOB_TOKEN is available (GitLab CI).'
  );
  process.exit(1);
}

const parsed = new URL(registry);
const authPath = parsed.pathname.endsWith('/')
  ? parsed.pathname
  : `${parsed.pathname}/`;
const authLine = `//${parsed.host}${authPath}:_authToken=${token}\n`;

const tempDir = mkdtempSync(join(tmpdir(), 'anyline-npm-'));
const npmrcPath = join(tempDir, '.npmrc');
writeFileSync(npmrcPath, authLine, { mode: 0o600 });

const result = spawnSync(
  'npm',
  ['publish', '--registry', registry, '--tag', 'internal'],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NPM_CONFIG_USERCONFIG: npmrcPath,
    },
  }
);

rmSync(tempDir, { recursive: true, force: true });
process.exit(result.status ?? 1);
