import { PrismaService } from '@/services/database/prisma.service';
import { Module } from '@nestjs/common';

import { AgtController } from './agt.controller';
import { AgtService } from './agt.service';

@Module({
  controllers: [AgtController],
  providers: [AgtService, PrismaService],
})
export class AgtModule {}
