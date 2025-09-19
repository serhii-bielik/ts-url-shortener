import { prisma } from '../db';
import { nanoid } from 'nanoid';

export async function createUniqueSlug() {
  for (let i = 0; i < 10; i++) {
    const slug = nanoid(6);
    const exists = await prisma.link.findUnique({ where: { slug } });
    if (!exists) return slug;
  }

  throw new Error('Failed to generate unique slug');
}
