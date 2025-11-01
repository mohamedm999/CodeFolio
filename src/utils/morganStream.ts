import { logger } from './logger';

export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
};
