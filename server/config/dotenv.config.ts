import Logger from './logger.config';
import dotenv from 'dotenv';

export const loadEnvVariables = () => {
  // Setup dotEnv
  Logger.info('Loading variables from .env ...');
  dotenv.config();
  Logger.info('Variables loaded');
};
