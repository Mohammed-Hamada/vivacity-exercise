import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  database:
    process.env.NODE_ENV === 'development'
      ? process.env.DB_NAME
      : process.env.DB_NAME_TEST,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  max: 20,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 30000,
});

export default pool;
