import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AgtModule } from '@/modules/agt/agt.module';
import { AgtService } from '@/modules/agt/agt.service';

@Module({
  imports: [AgtModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, AgtService],
})
export class UsersModule {}
