import { config as setupDotenv } from 'dotenv';
import { resolve } from 'path';

setupDotenv({ path: resolve(__dirname, '..', '.env.development') });

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const secretKey = process.env.SECRET;

export const config = {
  port,
  mongoUri,
  secretKey,
};
