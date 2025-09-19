import express from 'express';

import { createShortLink, getLink } from '../controllers/link.controller';
import { createLinkSchema } from '../validation/link.validation';
import { validate } from '../middleware/validate.middleware';

const linkRouter = express.Router();

// linkRouter.route('/shorten').post(createShortLink);
linkRouter.post('/shorten', validate(createLinkSchema), createShortLink);
linkRouter.route('/:slug').get(getLink);

export default linkRouter;
