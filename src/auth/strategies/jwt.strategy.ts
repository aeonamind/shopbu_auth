import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from 'src/configs/jwt.config';
import { ConfigName } from 'src/constants/config-name.constant';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    const jwtConfig = configService.get<JwtConfig>(ConfigName.Jwt);
    const extractJwtFromCookie = (req: Request) => {
      let token = null;
      console.log(req.cookies);
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }

      if (!token && !ExtractJwt.fromAuthHeaderAsBearerToken()(req))
        throw new UnauthorizedException('Your token is not valid or expired');
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
