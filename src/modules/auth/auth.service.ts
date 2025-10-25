import { ApiAuthResponse } from '@/types/api';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, UserDto } from '@/common/dtos/users.dto';
import { TokenPayload } from '@/types/token';
import { generateOtp } from '@/utils/generate-otp';
import { SignInDto } from './dtos/sign-in.dto';

import { DocsService } from '@/modules/docs/docs.service';
import { CreateIdocDto } from '@/modules/docs/dtos/create-idoc.dto';
import { UsersService } from '@/modules/users/users.service';

import { PrismaService } from '@/services/database/prisma.service';
import { MailService } from '@/services/mail/mail.service';
import { generateOtpMailTemplate } from '@/services/mail/templates/otp.mail';

import * as bcrypt from 'bcrypt';
import { addMinutes } from 'date-fns';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
    private docs: DocsService,
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
    const user = await this.usersService.findUserByEmail(email);

    const isValidPassWord = await bcrypt.compare(password, user.password);

    if (!isValidPassWord) {
      throw new UnauthorizedException('Credencias Inválidas!');
    }

    return {
      user,
    };
  }

  async signUp(data: CreateUserDto): Promise<ApiAuthResponse> {
    const { name, email, nif, password, role } = data;

    const user = await this.usersService.createUser({
      name,
      email,
      nif,
      role,
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
    const otp = generateOtp();
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

    const user = await this.usersService.findUserId(userId);

    // eslint-disable-next-line no-console
    console.log({
      to: user.email,
      otp: data.otp,
    });

    try {
      await this.mailService.send({
        content: generateOtpMailTemplate({
          otp: data.otp,
          user: user.name,
        }),
        subject: 'Confirme o seu e-mail',
        to: user.email,
      });
    } catch {
      throw new InternalServerErrorException('Serviço de e-mail indisponível!');
    }

    return {
      email: user.email,
    };
  }

  async verifyUserEmail(data: { userId: string; otp: string }) {
    const otp = await this.usersService.findUserOtp(data.userId, data.otp);
    const user = await this.usersService.verifyUserEmail(data.userId);

    await this.usersService.updateUserOtp(otp.id);

    return {
      user,
    };
  }

  async saveIdoc(data: CreateIdocDto) {
    const { userId } = data;
    await this.docs.save(data);
    const user = await this.usersService.updateUserIdentity(userId);

    return {
      user,
    };
  }
}
