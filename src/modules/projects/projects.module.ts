import { PrismaService } from '@/services/database/prisma.service';
import { Module } from '@nestjs/common';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [PrismaService, ProjectsService],
})
export class ProjectsModule {}
