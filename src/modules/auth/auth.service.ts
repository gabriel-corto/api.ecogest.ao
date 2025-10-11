import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ApiAuthResponse } from '@/types/api';

import { CreateUserDto, UserDto } from '@/common/dtos/users.dto';
import { SignInDto } from './dtos/sign-in.dto';

import { UsersService } from '@/modules/users/users.service';
import { OtpService } from '@/services/otp.service';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '@/services/prisma.service';
import { TokenPayload } from '@/types/token';

import { MailService } from '@/services/mail/mail.service';
import * as bcrypt from 'bcrypt';
import { addMinutes } from 'date-fns';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private otpService: OtpService,
    private mailService: MailService,
  ) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async generateAuthToken(user: UserDto) {
    const { email, nif, id: userId } = user;

    const tokenPayload: TokenPayload = {
      nif,
      email,
      userId,
    };

    return await this.jwtService.signAsync(tokenPayload);
  }

  public async setAuthToken(res: Response, user: UserDto) {
    const token = await this.generateAuthToken(user);

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });
  }

  public clearAuthToken(res: Response) {
    res.clearCookie('authToken', {
      maxAge: 0,
    });
  }

  async signIn(data: SignInDto): Promise<ApiAuthResponse> {
    const { email, password } = data;
    const user = await this.usersService.getUserByEmail(email);

    const isValidPassWord = await bcrypt.compare(password, user.password);
    if (!isValidPassWord) {
      throw new UnauthorizedException('Credencias Inválidas!');
    }

    return {
      user,
    };
  }

  async signUp(data: CreateUserDto): Promise<ApiAuthResponse> {
    const { name, email, nif, password } = data;

    const user = await this.usersService.createUser({
      name,
      email,
      nif,
      password: await this.hashPassword(password),
    });

    return {
      user,
    };
  }

  signOut(res: Response) {
    this.clearAuthToken(res);
  }

  async generateOtp(userId: string) {
    const otp = this.otpService.generateOtp();
    const expires_at = addMinutes(new Date(), 2);

    const data = await this.prisma.otp.create({
      data: {
        otp,
        expires_at,

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const user = await this.usersService.getUserById(userId);

    await this.mailService.send({
      content: this.mailService.otpMail({ otp: data.otp, user: user.name }),
      subject: 'Confirme o seu e-mail',
      to: user.email,
    });

    return {
      email: user.email,
    };
  }

  async verifyUserEmail(data: { userId: string; otp: string }) {
    const otp = await this.usersService.getUserOtp(data.userId, data.otp);
    const user = await this.usersService.verifyUserEmail(data.userId);

    await this.usersService.updateOtp(otp.id);

    return {
      user,
    };
  }
}
