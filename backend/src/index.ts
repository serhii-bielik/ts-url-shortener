import express from 'express';
import dotenv from 'dotenv';
import { prisma } from './db';
import linkRouter from './routes/link.routes';

dotenv.config();

export const app = express();

app.use(express.json());

app.use('/', linkRouter);

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`✅ Server ready on http://localhost:${port}`);
});

async function shutdown(signal: string) {
  console.log(`\n🔌 Received ${signal}, closing server...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log('✅ Database disconnected');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
