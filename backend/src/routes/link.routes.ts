import express from 'express';

import { createShortLink, getLink } from '../controllers/link.controller';
import { createLinkSchema } from '../validation/link.validation';
import { validate } from '../middleware/validate.middleware';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

const linkRouter = express.Router();

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  handler: (_req, _res, next) => {
    const error = new Error('Too many requests, try again later');
    (error as any).status = 429;
    next(error);
  },
});

linkRouter.post('/shorten', limiter, validate(createLinkSchema), createShortLink);
linkRouter.route('/:slug').get(getLink);

export default linkRouter;
