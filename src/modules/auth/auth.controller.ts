import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import {
  AUTH_SERVICE_NAME,
  GetTokenResponse,
  ValidateRequest,
  ValidateResponse,
  GetTokenRequest,
  SignUpResponse,
  SignUpRequest,
} from './auth.pb';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'GetToken')
  async getToken({ user }: GetTokenRequest): Promise<GetTokenResponse> {
    return { token: await this.authService.getToken(user) };
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  async validate(user: ValidateRequest): Promise<ValidateResponse> {
    return await this.authService.validate(user);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'SignUp')
  async signUp({ user }: SignUpRequest): Promise<SignUpResponse> {
    return await this.authService.signUp(user);
  }
}
