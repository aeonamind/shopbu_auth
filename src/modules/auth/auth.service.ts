import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { OauthUserRequest, UserRequest } from './auth.pb';
import * as bcrypt from 'bcrypt';

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async getToken(user: OauthUserRequest) {
    let _user = await this.findUserByEmail(user.email);
    if (!_user) {
      _user = await this.registerUser(user);
    }

    return this.generateJwt({ sub: _user.id, email: _user.email });
  }

  async registerUser(user: OauthUserRequest) {
    const newUser = this.userRepository.create({
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) return null;

    return user;
  }

  async signUp(user: UserRequest) {
    if (await this.checkEmailExist(user.email))
      return { error: 'email already exists', token: null };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    let newUser = this.userRepository.create({
      name: user.name,
      email: user.email,
      password: hashPassword,
    });

    newUser = await this.userRepository.save(newUser);
    return {
      error: null,
      token: this.generateJwt({ sub: newUser.id, email: newUser.email }),
    };
  }

  async checkEmailExist(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user)
      return {
        error: 'Token is invalid',
        user: null,
      };

    return {
      error: null,
      user,
    };
  }
}
