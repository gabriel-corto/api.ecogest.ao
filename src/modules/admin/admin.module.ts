import { PrismaService } from '@/services/database/prisma.service';
import { Module } from '@nestjs/common';
import { AgtService } from '../agt/agt.service';
import { UsersService } from '../users/users.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, UsersService, PrismaService, AgtService],
})
export class AdminModule {}
