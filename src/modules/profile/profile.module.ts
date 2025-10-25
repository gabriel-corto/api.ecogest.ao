import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';

import { AgtService } from '@/modules/agt/agt.service';
import { PrismaService } from '@/services/database/prisma.service';

import { UsersService } from '@/modules/users/users.service';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UsersService, PrismaService, AgtService],
})
export class ProfileModule {}
