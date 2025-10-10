import { Body, Controller, Post, Res } from '@nestjs/common';
import { type Response } from 'express';

import { AuthService } from './auth.service';

import { CreateUserDto } from '@/common/dtos/users.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const { user } = await this.authService.signIn(body);

    await this.authService.setAuthToken(res, user);

    return res.json({
      data: user,
      message: 'AUTHORIZED',
    });
  }

  @Post('/sign-up')
  async signUp(@Body() body: CreateUserDto, @Res() res: Response) {
    const { user } = await this.authService.signUp(body);

    await this.authService.setAuthToken(res, user);

    return res.json({
      data: user,
      message: 'AUTHORIZED',
    });
  }
}
