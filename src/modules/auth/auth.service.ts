import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { AgtService } from '../agt/agt.service';
import { UsersService } from '../users/users.service';

import { SignUpDto } from '@/modules/auth/dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

import { ApiAuthResponse } from '@/types/api';
import { TokenPayload } from '@/types/token';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private agtService: AgtService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  private async generateAuthToken(user: User): Promise<string> {
    const { email, nif, id: userId } = user;
    const tokenPayload: TokenPayload = {
      nif,
      email,
      userId,
    };
    const token = await this.jwtService.signAsync(tokenPayload);

    return token;
  }

  public setAuthToken(res: Response, token: string) {
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });
  }

  async signUp(user: SignUpDto): Promise<ApiAuthResponse> {
    const userAgtEntity = await this.agtService.getEntityByNif(user.nif);
    const userAlreadyExist = await this.usersService.getUserByEmail(user.email);

    if (!userAgtEntity) {
      throw new BadRequestException('Não existe um registro fiscal associada a este NIF!');
    }

    if (userAlreadyExist) {
      throw new ConflictException('Já Existe uma conta associada a estas credencias!');
    }

    const createdUser = await this.usersService.createUser({
      ...user,
      password: await this.hashPassword(user.password),
    });

    const token = await this.generateAuthToken(createdUser);

    return {
      token,
      user: createdUser,
    };
  }

  async signIn(user: SignInDto): Promise<ApiAuthResponse> {
    const existingUser = await this.usersService.getUserByEmail(user.email);

    if (!existingUser) {
      throw new BadRequestException('Conta Não encontrada!');
    }

    const passwordValid = await bcrypt.compare(user.password, existingUser.password);

    if (!passwordValid) {
      throw new BadRequestException('Credencias Inválidas!');
    }

    const token = await this.generateAuthToken(existingUser);

    return {
      token,
      user: existingUser,
    };
  }
}
