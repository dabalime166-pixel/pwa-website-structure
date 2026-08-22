import 'server-only'

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export type PersistMode = 'local' | 'github' | 'readonly'

export type PersistResult = {
  mode: PersistMode
  path: string
  commit?: string
  warning?: string
}

const ROOT = process.cwd()

export function contentPath(relative: string): string {
  return join(ROOT, relative.replace(/^\//, ''))
}

export function readJsonFile<T>(relative: string): T {
  const raw = readFileSync(contentPath(relative), 'utf8')
  return JSON.parse(raw) as T
}

export function writeJsonFile(relative: string, data: unknown): string {
  const text = `${JSON.stringify(data, null, 2)}\n`
  writeFileSync(contentPath(relative), text, 'utf8')
  return text
}

function githubConfig(): { token: string; owner: string; repo: string; branch: string } | null {
  const token = process.env.GITHUB_TOKEN?.trim()
  const repoFull = process.env.GITHUB_REPO?.trim()
  if (!token || !repoFull) return null
  const [owner, repo] = repoFull.split('/')
  if (!owner || !repo) return null
  return {
    token,
    owner,
    repo,
    branch: process.env.GITHUB_BRANCH?.trim() || 'main',
  }
}

async function githubGetFileSha(
  cfg: NonNullable<ReturnType<typeof githubConfig>>,
  path: string,
): Promise<string | null> {
  const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${path}?ref=${encodeURIComponent(cfg.branch)}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'no-store',
  })
  if (res.status === 404) return null
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub read failed (${res.status}): ${body.slice(0, 200)}`)
  }
  const data = (await res.json()) as { sha?: string }
  return data.sha ?? null
}

async function githubWriteFile(
  cfg: NonNullable<ReturnType<typeof githubConfig>>,
  path: string,
  content: string,
  message: string,
): Promise<string> {
  const sha = await githubGetFileSha(cfg, path)
  const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${path}`
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch: cfg.branch,
      ...(sha ? { sha } : {}),
    }),
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub write failed (${res.status}): ${body.slice(0, 240)}`)
  }
  const data = (await res.json()) as { commit?: { sha?: string } }
  return data.commit?.sha ?? 'ok'
}

export async function persistContentFile(
  relativePath: string,
  data: unknown,
  commitMessage: string,
): Promise<PersistResult> {
  const path = relativePath.replace(/^\//, '')
  const content = `${JSON.stringify(data, null, 2)}\n`
  const cfg = githubConfig()

  if (cfg) {
    const commit = await githubWriteFile(cfg, path, content, commitMessage)
    await triggerDeployHook()
    return { mode: 'github', path, commit }
  }

  if (process.env.VERCEL === '1' && !process.env.ADMIN_ALLOW_LOCAL_FS) {
    return {
      mode: 'readonly',
      path,
      warning:
        'Serverless deploy has no writable disk. Set GITHUB_TOKEN + GITHUB_REPO (and optional VERCEL_DEPLOY_HOOK) to persist admin edits.',
    }
  }

  writeFileSync(contentPath(path), content, 'utf8')
  return { mode: 'local', path }
}

export async function triggerDeployHook(): Promise<void> {
  const hook = process.env.VERCEL_DEPLOY_HOOK?.trim()
  if (!hook) return
  try {
    await fetch(hook, { method: 'POST', cache: 'no-store' })
  } catch {
    // non-fatal
  }
}

export function getPersistCapabilities() {
  const gh = githubConfig()
  return {
    github: Boolean(gh),
    githubBranch: gh?.branch,
    localFs: process.env.VERCEL !== '1' || Boolean(process.env.ADMIN_ALLOW_LOCAL_FS),
    deployHook: Boolean(process.env.VERCEL_DEPLOY_HOOK?.trim()),
  }
}
