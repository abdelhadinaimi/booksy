import Logger from './logger.config';
import dotenv from 'dotenv';

export const loadEnvVariables = () => {
  // Setup dotEnv
  Logger.info('Loading variables from .env ...');
  const result = dotenv.config({ path: '.env' });
  if (result.error) {
    Logger.error(`.env file doens't exist please add it.`);
    process.exit(1);
  }
  Logger.info('Variables loaded');
};
