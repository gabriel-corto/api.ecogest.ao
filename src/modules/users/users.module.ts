import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],

  providers: [PrismaService, UsersRepository, UsersService, JwtService],
})
export class UsersModule {}
