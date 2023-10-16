import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '@modules/users/entities/user.entity';
import jwtConfig from '@core/configs/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (jwtConf: ConfigType<typeof jwtConfig>) => {
        return {
          global: true,
          secret: jwtConf.secret,
          signOptions: { expiresIn: parseInt(jwtConf.expiresIn) },
        };
      },
      inject: [jwtConfig.KEY],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
