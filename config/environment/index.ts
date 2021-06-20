import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;


// You may use this as a boolean value for different situations
const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production',
};

export { PORT, env, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET };