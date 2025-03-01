export * from './routes';
export * from './http';
export * from './middleware';
export * from './lambda';
export * from './memoize';
export * from './helpers';

import { Logger } from './logger';

export const Log = Logger.getInstance();
