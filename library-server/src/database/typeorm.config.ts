import { ConnectionOptions } from 'typeorm';

export const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'graphql-library',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
