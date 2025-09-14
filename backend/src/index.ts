import express from 'express';
import dotenv from 'dotenv';
import { prisma } from './db';
import { notFound, errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

async function main() {
  app.use(express.json());
  app.use(notFound);
  app.use(errorHandler);

  const port = process.env.PORT || '3000';

  app.listen(port, () => {
    console.log(`Ready on ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
