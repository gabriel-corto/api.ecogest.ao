import { PrismaService } from '@/services/database/prisma.service';
import { Module } from '@nestjs/common';

import { AgtModule } from '@/modules/agt/agt.module';
import { AgtService } from '@/modules/agt/agt.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AgtModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, AgtService],
})
export class UsersModule {}
