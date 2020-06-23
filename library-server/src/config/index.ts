const DEV_DB_HOST = 'localhost';
const DEV_DB_PORT = 5432;
const DEV_DB_USERNAME = 'postgres';
const DEV_DB_PASSWORD = 'postgres';
const DEV_DB_DATABASE = 'graphql-library';

const getDevelopmentJwt = (): string => {
  console.warn('🔴️ Using development JWT_SECRET');
  return 'TopSecretDontUseInProduction!';
};

export const JWT_SECRET = process.env.JWT_SECRET || getDevelopmentJwt();
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const API_PREFIX = IS_PRODUCTION ? '/api' : '';
export const PORT = process.env.PORT || 4000;
export const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgres://${DEV_DB_USERNAME}:${DEV_DB_PASSWORD}@${DEV_DB_HOST}:${DEV_DB_PORT}/${DEV_DB_DATABASE}`;
export const BOARD_GAME_ATLAS_CLIENT_ID = process.env.BOARD_GAME_ATLAS_CLIENT_ID;
