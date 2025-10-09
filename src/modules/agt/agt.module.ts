import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';

import { AgtController } from './agt.controller';
import { AgtRepository } from './agt.repository';
import { AgtService } from './agt.service';

@Module({
  imports: [],
  controllers: [AgtController],
  providers: [AgtService, AgtRepository, PrismaService],
})
export class AgtModule {}
