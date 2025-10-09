import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { PrismaService } from '@/services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AuthModule {}
