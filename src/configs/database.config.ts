import { ConfigName } from 'src/constants/config-name.constant';

export const databaseConfig = () => ({
  [ConfigName.Database]: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

export type DatabaseConfig = ReturnType<
  typeof databaseConfig
>[ConfigName.Database];
