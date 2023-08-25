import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.signIn(req.user as User);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: false,
    });

    return res.status(HttpStatus.OK).end();
  }

  @Get('/users/profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    res.status(HttpStatus.OK).json({
      id: user.id,
      email: user.email,
    });
  }
}
