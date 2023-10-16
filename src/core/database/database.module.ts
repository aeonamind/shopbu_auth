import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@modules/users/entities/user.entity';
import databaseConfig from '@core/configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (databaseConf: ConfigType<typeof databaseConfig>) => {
        return {
          type: 'postgres',
          host: databaseConf.host,
          port: databaseConf.port,
          username: databaseConf.username,
          password: databaseConf.password,
          database: databaseConf.database,
          entities: [User],
          synchronize: true,
        };
      },
      inject: [databaseConfig.KEY],
    }),
  ],
})
export class DatabaseModule {}
