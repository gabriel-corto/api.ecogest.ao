import { CreateEntityDto } from '@/modules/agt/dtos/create-entity.dto';
import { PrismaService } from '@/services/prisma.service';

import { Injectable } from '@nestjs/common';
import { Entity } from '@prisma/client';

@Injectable()
export class AgtRepository {
  constructor(private prisma: PrismaService) {}

  async getAllEntities(): Promise<Entity[]> {
    return await this.prisma.entity.findMany();
  }

  async getEntityByNif(nif: string): Promise<Entity | null> {
    return await this.prisma.entity.findFirst({
      where: {
        nif,
      },
    });
  }

  async createEntity(createEntityDTO: CreateEntityDto): Promise<Entity> {
    const { nif, name, entityType } = createEntityDTO;

    return await this.prisma.entity.create({
      data: {
        nif,
        name,
        entityType,
      },
    });
  }
}
