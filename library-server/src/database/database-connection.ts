import { Connection, createConnection } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

export const createDatabaseConnection = (): Promise<Connection> => createConnection(typeOrmConfig);
