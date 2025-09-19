import { Request, Response } from 'express';
import { prisma } from '../db';
import { createUniqueSlug } from '../services/link.service';

// @desc    Create new short link
// @route 	POST /shorten
// @access  Public
export const createShortLink = async (req: Request, res: Response) => {
  const { destination } = req.body;
  if (!destination || !destination.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid destination URL' });
  }

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
export const getLink = async (req: Request, res: Response) => {
  const { slug } = req.params as { slug: string };
  if (!slug) {
    res.status(400);
    throw new Error('URL is required');
  }

  const link = await prisma.link.findUnique({
    where: { slug: slug },
  });

  if (!link) {
    res.status(404);
    throw new Error('Link not found!');
  }

  res.redirect(301, link.destination);
};
