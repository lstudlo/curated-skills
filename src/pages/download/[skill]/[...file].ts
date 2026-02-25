import type { APIRoute } from 'astro';
import {
  getSkillFileBinary,
  getSkillFileStaticPaths,
  guessContentType,
} from '../../../lib/skills';

export const prerender = true;

export async function getStaticPaths() {
  return getSkillFileStaticPaths();
}

export const GET: APIRoute = async ({ params }) => {
  const skillSlug = params.skill ?? '';
  const relativePath = params.file ?? '';

  const fileData = await getSkillFileBinary(skillSlug, relativePath);
  if (!fileData) {
    return new Response('Not found', { status: 404 });
  }

  const filename = fileData.file.name;
  const disposition = `attachment; filename="${filename.replaceAll('"', '')}"; filename*=UTF-8''${encodeURIComponent(filename)}`;

  return new Response(fileData.bytes, {
    status: 200,
    headers: {
      'Content-Type': guessContentType(fileData.file.relativePath),
      'Content-Disposition': disposition,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
