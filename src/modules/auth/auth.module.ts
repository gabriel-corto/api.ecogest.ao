import { Module } from '@nestjs/common';

import { AuthController } from '@/modules/auth/auth.controller';

import { AuthService } from './auth.service';

import { PrismaService } from '@/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AgtService } from '../agt/agt.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, AgtService],
})
export class AuthModule {}
