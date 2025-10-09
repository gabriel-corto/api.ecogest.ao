import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';

import { AuthController } from '@/modules/auth/auth.controller';

import { AgtService } from '../agt/agt.service';
import { AuthService } from './auth.service';

import { AgtRepository } from '../agt/agt.repository';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AgtService, UsersService, PrismaService, AgtRepository, UsersRepository],
})
export class AuthModule {}
