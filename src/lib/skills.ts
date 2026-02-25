import { promises as fs } from 'node:fs';
import path from 'node:path';

export interface SkillFileEntry {
  relativePath: string;
  absolutePath: string;
  name: string;
  extension: string;
  sizeBytes: number;
  isText: boolean;
}

export interface SkillEntry {
  slug: string;
  directoryName: string;
  title: string;
  description: string;
  license?: string;
  files: SkillFileEntry[];
  fileCount: number;
  directoryCount: number;
  totalBytes: number;
  hasSkillMarkdown: boolean;
}

export interface SkillFileContent {
  skill: SkillEntry;
  file: SkillFileEntry;
  content: string;
}

const SKILLS_ROOT = path.join(process.cwd(), 'src', 'skills');
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

const TEXT_EXTENSIONS = new Set([
  '.md',
  '.txt',
  '.json',
  '.jsonc',
  '.js',
  '.mjs',
  '.cjs',
  '.ts',
  '.mts',
  '.cts',
  '.tsx',
  '.jsx',
  '.astro',
  '.css',
  '.scss',
  '.sass',
  '.less',
  '.html',
  '.xml',
  '.yml',
  '.yaml',
  '.toml',
  '.sh',
  '.bash',
  '.zsh',
  '.py',
  '.rb',
  '.go',
  '.rs',
  '.java',
  '.kt',
  '.swift',
  '.php',
  '.sql',
  '.env',
  '.gitignore',
  '.lock',
  '.d.ts',
]);

let skillsCache: Promise<SkillEntry[]> | null = null;

export async function getSkills(): Promise<SkillEntry[]> {
  skillsCache ??= loadSkills();
  return skillsCache;
}

export async function getSkillBySlug(slug: string): Promise<SkillEntry | null> {
  const skills = await getSkills();
  return skills.find((skill) => skill.slug === slug) ?? null;
}

export async function getSkillFileContent(
  skillSlug: string,
  relativePath: string
): Promise<SkillFileContent | null> {
  const skill = await getSkillBySlug(skillSlug);
  if (!skill) return null;

  const normalized = normalizeRelativePath(relativePath);
  const file = skill.files.find((entry) => entry.relativePath === normalized);
  if (!file || !file.isText) return null;

  const content = await fs.readFile(file.absolutePath, 'utf8');
  return { skill, file, content };
}

export async function getSkillFileBinary(
  skillSlug: string,
  relativePath: string
): Promise<{ skill: SkillEntry; file: SkillFileEntry; bytes: Uint8Array } | null> {
  const skill = await getSkillBySlug(skillSlug);
  if (!skill) return null;

  const normalized = normalizeRelativePath(relativePath);
  const file = skill.files.find((entry) => entry.relativePath === normalized);
  if (!file) return null;

  const bytes = await fs.readFile(file.absolutePath);
  return { skill, file, bytes };
}

export async function getSkillStaticPaths() {
  const skills = await getSkills();
  return skills.map((skill) => ({
    params: { skill: skill.slug },
    props: { skillSlug: skill.slug },
  }));
}

export async function getSkillFileStaticPaths() {
  const skills = await getSkills();
  return skills.flatMap((skill) =>
    skill.files.map((file) => ({
      params: { skill: skill.slug, file: file.relativePath },
      props: { skillSlug: skill.slug, relativePath: file.relativePath },
    }))
  );
}

export function buildSkillHref(skillSlug: string) {
  return `/skills/${encodeURIComponent(skillSlug)}/`;
}

export function buildSkillFileHref(skillSlug: string, relativePath: string) {
  return `/skills/${encodeURIComponent(skillSlug)}/files/${encodePathSegments(relativePath)}`;
}

export function buildSkillDownloadHref(skillSlug: string, relativePath: string) {
  return `/download/${encodeURIComponent(skillSlug)}/${encodePathSegments(relativePath)}`;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = -1;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

export function guessContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.md':
    case '.txt':
    case '.sh':
    case '.py':
    case '.toml':
    case '.yml':
    case '.yaml':
      return 'text/plain; charset=utf-8';
    case '.json':
    case '.jsonc':
      return 'application/json; charset=utf-8';
    case '.js':
    case '.mjs':
    case '.cjs':
      return 'text/javascript; charset=utf-8';
    case '.ts':
    case '.tsx':
    case '.mts':
    case '.cts':
      return 'text/plain; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.html':
    case '.astro':
      return 'text/html; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

function encodePathSegments(relativePath: string) {
  return normalizeRelativePath(relativePath)
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function normalizeRelativePath(value: string) {
  const normalized = value.replaceAll('\\', '/').replace(/^\/+/, '');
  if (!normalized || normalized.includes('../')) {
    throw new Error(`Invalid relative path: ${value}`);
  }
  return normalized;
}

async function loadSkills(): Promise<SkillEntry[]> {
  const entries = await fs.readdir(SKILLS_ROOT, { withFileTypes: true });
  const directories = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const skills = await Promise.all(directories.map((dir) => loadSkill(dir)));

  return skills.sort((a, b) => a.title.localeCompare(b.title));
}

async function loadSkill(directoryName: string): Promise<SkillEntry> {
  const skillRoot = path.join(SKILLS_ROOT, directoryName);
  const files = await walkFiles(skillRoot);
  const directories = new Set<string>();

  for (const file of files) {
    const dirName = path.posix.dirname(file.relativePath);
    if (dirName && dirName !== '.') directories.add(dirName);
  }

  const skillMarkdown = files.find((file) => file.relativePath === 'SKILL.md');
  const parsed = skillMarkdown
    ? parseSkillFrontmatter(await fs.readFile(skillMarkdown.absolutePath, 'utf8'))
    : null;

  return {
    slug: directoryName,
    directoryName,
    title: parsed?.name || directoryName,
    description: parsed?.description || 'No description provided.',
    license: parsed?.license,
    files: sortFiles(files),
    fileCount: files.length,
    directoryCount: directories.size,
    totalBytes: files.reduce((sum, file) => sum + file.sizeBytes, 0),
    hasSkillMarkdown: Boolean(skillMarkdown),
  };
}

async function walkFiles(baseDir: string, relativeDir = ''): Promise<SkillFileEntry[]> {
  const currentDir = path.join(baseDir, relativeDir);
  const entries = await fs.readdir(currentDir, { withFileTypes: true });
  const files: SkillFileEntry[] = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.')) continue;

    const nextRelative = relativeDir ? path.posix.join(relativeDir, entry.name) : entry.name;
    const absolutePath = path.join(baseDir, nextRelative);

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(baseDir, nextRelative)));
      continue;
    }

    if (!entry.isFile()) continue;

    const stat = await fs.stat(absolutePath);
    const extension = path.extname(entry.name).toLowerCase();

    files.push({
      relativePath: nextRelative.replaceAll(path.sep, '/'),
      absolutePath,
      name: entry.name,
      extension,
      sizeBytes: stat.size,
      isText: isLikelyTextFile(entry.name, extension),
    });
  }

  return files;
}

function isLikelyTextFile(fileName: string, extension: string) {
  if (TEXT_EXTENSIONS.has(extension)) return true;
  if (fileName === 'LICENSE' || fileName.startsWith('LICENSE.')) return true;
  return !extension;
}

function sortFiles(files: SkillFileEntry[]) {
  return [...files].sort((a, b) => {
    if (a.relativePath === 'SKILL.md') return -1;
    if (b.relativePath === 'SKILL.md') return 1;

    const aDepth = a.relativePath.split('/').length;
    const bDepth = b.relativePath.split('/').length;
    if (aDepth !== bDepth) return aDepth - bDepth;

    return a.relativePath.localeCompare(b.relativePath);
  });
}

function parseSkillFrontmatter(content: string) {
  const match = content.match(FRONTMATTER_RE);
  if (!match) return null;

  const result: Record<string, string> = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separatorIndex = line.indexOf(':');
    if (separatorIndex <= 0) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return {
    name: result.name,
    description: result.description,
    license: result.license,
  };
}
