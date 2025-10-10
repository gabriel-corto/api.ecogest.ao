import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { ApiAuthResponse } from '@/types/api';
import { TokenPayload } from '@/types/token';

import { CreateUserDto, UserDto } from '@/common/dtos/users.dto';
import { SignInDto } from './dtos/sign-in.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

  async signIn(data: SignInDto): Promise<ApiAuthResponse> {
    const { email, password } = data;
    const user = await this.usersService.getUserByEmail(email);

    const isValidPassWord = await bcrypt.compare(password, user.password);
    if (!isValidPassWord) {
      throw new BadRequestException('Credencias Inválidas!');
    }

    return {
      user,
    };
  }

  async signUp(data: CreateUserDto): Promise<ApiAuthResponse> {
    const { name, email, nif, entityType, password } = data;

    const user = await this.usersService.createUser({
      name,
      email,
      nif,
      entityType,
      password: await this.hashPassword(password),
    });

    return {
      user,
    };
  }
}
