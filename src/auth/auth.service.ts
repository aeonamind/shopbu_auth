import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: User) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const existUser = await this.findUserByEmail(user.email);

    if (!existUser) {
      return this.registerUser(user);
    }

    return this.generateJwt({ sub: existUser.id, email: existUser.email });
  }

  async registerUser(user: User) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return this.generateJwt({ sub: newUser.id, email: newUser.email });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) return null;

    return user;
  }
}
