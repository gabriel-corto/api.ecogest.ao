import { Module } from '@nestjs/common';

import { AuthController } from '@/modules/auth/auth.controller';

import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { AgtService } from '@/modules/agt/agt.service';
import { PrismaService } from '@/services/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, AgtService, PrismaService],
})
export class AuthModule {}
