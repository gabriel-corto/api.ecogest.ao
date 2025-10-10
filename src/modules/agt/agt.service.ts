import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { AngolanNifDto } from '@/common/dtos/angolan-nif.dto';
import { PrismaService } from '@/services/prisma.service';
import { CreateEntityDto } from './dtos/create-entity.dto';

@Injectable()
export class AgtService {
  constructor(private prisma: PrismaService) {}

  async getAllEntities() {
    return await this.prisma.entity.findMany();
  }

  async getEntityByNif({ nif }: AngolanNifDto) {
    const entity = await this.prisma.entity.findFirst({
      where: {
        nif,
      },
    });

    if (!entity) {
      throw new BadRequestException('Não existe uma entidade associada a este NIF!');
    }

    return entity;
  }

  async createEntity(data: CreateEntityDto) {
    const { name, nif, entityType } = data;

    const entity = await this.prisma.entity.findFirst({
      where: {
        nif,
      },
    });

    if (entity) {
      throw new ConflictException('Já Existe uma entidade com este NIF!');
    }

    return await this.prisma.entity.create({
      data: {
        name,
        nif,
        entityType,
      },
    });
  }
}
