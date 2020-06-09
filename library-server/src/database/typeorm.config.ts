import { DATABASE_URL } from 'config';
import { ConnectionOptions } from 'typeorm';

export const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
