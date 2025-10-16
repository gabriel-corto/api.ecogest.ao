import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';

import { PrismaService } from '@/services/database/prisma.service';
import { AgtService } from '../agt/agt.service';

import { UsersService } from '../users/users.service';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UsersService, PrismaService, AgtService],
})
export class ProfileModule {}
