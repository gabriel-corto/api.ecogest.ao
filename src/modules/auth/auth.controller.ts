import { Body, Controller, Post, Req, Res } from '@nestjs/common';

import { type AuthRequest } from '@/types/request';
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

  @Post('/sign-out')
  signOut(@Res() res: Response) {
    this.authService.signOut(res);

    return res.status(200).json({
      statusCode: 200,
      message: 'EXPIRED_SESSION',
    });
  }

  @Post('/generate-otp')
  async generateOtp(@Req() req: AuthRequest) {
    const { userId } = req.user;
    const { email } = await this.authService.generateOtp(userId);

    return {
      message: `Código OTP Enviado para ${email}`,
    };
  }
}
