import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './db';
import linkRouter from './routes/link.routes';
import { errorHandler, notFound } from './middleware/error.middleware';

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(express.json());

app.use('/', linkRouter);

app.use(notFound);
app.use(errorHandler);

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
