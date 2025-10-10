import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';

import { AgtService } from '../agt/agt.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, AgtService, UsersService],
})
export class UsersModule {}
