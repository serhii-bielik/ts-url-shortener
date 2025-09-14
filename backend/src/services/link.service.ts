import { prisma } from '../db';
import { nanoid } from 'nanoid';

export async function createUniqueSlug() {
  let slug: string;

  while (true) {
    slug = nanoid(6);
    const link = await prisma.link.findUnique({ where: { slug } });
    if (!link) break;
  }

  return slug;
}
