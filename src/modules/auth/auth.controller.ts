import { type AuthRequest } from '@/types/request';
import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';

import { ApiSuccessResponse } from '@/types/api';
import { AuthService } from './auth.service';

import { CreateUserDto } from '@/common/dtos/users.dto';
import { CreateIdocDto } from '@/modules/docs/dtos/create-idoc.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { VerifyEmailDto } from './dtos/verify-email.dto';

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

  @Post('/verify-email')
  async verifyUserEmail(
    @Body() data: VerifyEmailDto,
    @Req() req: AuthRequest,
  ): Promise<ApiSuccessResponse> {
    const { userId } = req.user;

    const { user } = await this.authService.verifyUserEmail({
      otp: data.otp,
      userId,
    });

    return {
      data: {
        ...user,
      },
      message: 'Email verificado com sucesso!',
    };
  }

  @Post('/verify-identity')
  @UseInterceptors(FileInterceptor('file'))
  async verifyUserIdentity(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthRequest,
    @Body() body: CreateIdocDto,
  ): Promise<ApiSuccessResponse> {
    const { userId } = req.user;
    const { type } = body;
    const { originalname: url } = file;

    const { user } = await this.authService.saveIdoc(
      {
        type,
        url,
      },
      userId,
    );

    return {
      data: {
        ...user,
      },
      message: 'Documento Enviado com sucesso!',
    };
  }
}
