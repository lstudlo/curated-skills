import { promises as fs } from 'node:fs';
import type { APIRoute } from 'astro';
import JSZip from 'jszip';
import { getSkillBySlug, getSkillStaticPaths } from '../../lib/skills';

export const prerender = true;

export async function getStaticPaths() {
  const skillPaths = await getSkillStaticPaths();
  return skillPaths.map(({ params }) => ({ params }));
}

export const GET: APIRoute = async ({ params }) => {
  const skillSlug = params.skill ?? '';
  const skill = await getSkillBySlug(skillSlug);

  if (!skill) {
    return new Response('Not found', { status: 404 });
  }

  const zip = new JSZip();

  for (const file of skill.files) {
    const bytes = await fs.readFile(file.absolutePath);
    zip.file(`${skill.directoryName}/${file.relativePath}`, bytes);
  }

  const archive = await zip.generateAsync({
    type: 'uint8array',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const filename = `${skill.directoryName}.zip`;
  return new Response(archive, {
    status: 200,
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
