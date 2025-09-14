import { prisma } from '../db';
import { createUniqueSlug } from '../services/link.service';

// @desc    Create new short link
// @route 	POST /shorten
// @access  Public
export const createShortLink = async (req: any, res: any) => {
  const { destination } = req.body;
  const slug = await createUniqueSlug();

  const link = await prisma.link.create({
    data: {
      destination,
      slug,
    },
  });

  res.json(link);
};

// @desc    Get link
// @route   GET /:slug
// @access  Public
export const getLink = async (req: any, res: any) => {
  const link = await prisma.link.findUnique({
    where: { slug: req.params.slug },
  });

  if (!link) {
    res.status(404);
    throw new Error('Link not found!');
  }

  // res.json({ ok: link });
  res.redirect(301, link.destination);
};
