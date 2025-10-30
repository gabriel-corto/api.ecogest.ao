import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/services/database/prisma.service';
import { CreateProjectDto } from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDto, userId: string) {
    const { locale, name, sector, slug } = data;

    const project = await this.prisma.project.findFirst({
      where: {
        slug,
      },
    });

    if (project) {
      throw new ConflictException('Este Projecto já foi cadastrado!');
    }

    return await this.prisma.project.create({
      data: {
        locale,
        name,
        sector,
        slug,
        userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async findById(id: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Projecto não encontrado!');
    }

    return project;
  }

  async delete(id: string) {
    const project = await this.findById(id);

    return await this.prisma.project.delete({
      where: {
        id: project.id,
      },
    });
  }
}
