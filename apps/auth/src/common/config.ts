export const APP_PORT = parseInt(process.env.APP_PORT);
export const APP_API_SCHEMA_PATH = 'swagger.json';
export const APP_HTTP_LOG_PATH = 'http.logs';

export const JWT_SECRET = process.env.JWT_SECRET || 'test';
export const JWT_ACCESS_TOKEN_EXPIRE_TIME_SECONDS = 60 * 60;
export const JWT_REFRESH_TOKEN_EXPIRE_TIME_SECONDS = 24 * 60 * 60;

export const EVENT_BROKERS = ['kafka:9092'];
export const EVENT_LISTENER_GROUP_ID = 'auth-app';

export const DB_TYPE = 'postgres';
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = parseInt(process.env.DB_PORT);
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT);

export const CACHE_TTL_MS = 15 * 1000;
export const CACHE_MAX_ITEMS = 1000;

export const QUEUE_MAX_EXECUTED_JOBS = Infinity;
export const QUEUE_MAX_CONCURRENT_JOBS = 4;
export const QUEUE_MAX_RETRY_COUNT = 3;
export const QUEUE_MAX_JOB_TIME_MS = 15 * 60 * 1000;
export const QUEUE_SYNC = 'sync-job';

export const GENERATOR_APP_URL = process.env.GENERATOR_APP_URL;
