import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@core/database/database.module';
import nodeConfig from '@core/configs/node.config';
import databaseConfig from '@core/configs/database.config';
import jwtConfig from '@core/configs/jwt.config';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [nodeConfig, databaseConfig, jwtConfig],
      cache: true,
      expandVariables: true,
    }),
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
