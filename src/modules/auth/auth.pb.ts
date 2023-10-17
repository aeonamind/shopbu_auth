/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface OauthUserRequest {
  provider: string;
  email: string;
  name: string | undefined;
  avatarUrl: string | undefined;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface GetTokenRequest {
  user: OauthUserRequest | undefined;
}

export interface GetTokenResponse {
  token: string;
}

export interface ValidateRequest {
  sub: string;
  email: string;
}

export interface ValidateResponse {
  error: string;
  user: UserResponse | undefined;
}

export interface SignUpRequest {
  user: UserRequest | undefined;
}

export interface SignUpResponse {
  error: string;
  token: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AuthServiceClient {
  getToken(request: GetTokenRequest): Observable<GetTokenResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  signUp(request: SignUpRequest): Observable<SignUpResponse>;
}

export interface AuthServiceController {
  getToken(
    request: GetTokenRequest,
  ):
    | Promise<GetTokenResponse>
    | Observable<GetTokenResponse>
    | GetTokenResponse;

  validate(
    request: ValidateRequest,
  ):
    | Promise<ValidateResponse>
    | Observable<ValidateResponse>
    | ValidateResponse;

  signUp(
    request: SignUpRequest,
  ): Promise<SignUpResponse> | Observable<SignUpResponse> | SignUpResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getToken', 'validate', 'signUp'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';
