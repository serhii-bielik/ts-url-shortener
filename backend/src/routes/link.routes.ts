import express from 'express';

import { createShortLink, getLink } from '../controllers/link.controller';

const linkRouter = express.Router();

linkRouter.route('/shorten').post(createShortLink);
linkRouter.route('/:slug').get(getLink);

export default linkRouter;
