import { Body, Controller, Post, Res } from '@nestjs/common';
import { type Response } from 'express';

import { AuthService } from './auth.service';

import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() body: SignUpDto, @Res() res: Response) {
    const { token, user } = await this.authService.signUp(body);

    this.authService.setAuthToken(res, token);

    return res.json({
      data: user,
      message: 'AUTHORIZED',
    });
  }

  @Post('/sign-in')
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const { token, user } = await this.authService.signIn(body);

    this.authService.setAuthToken(res, token);

    return res.json({
      data: user,
      message: 'AUTHORIZED',
    });
  }
}
