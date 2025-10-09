import { ConflictException, Injectable } from '@nestjs/common';
import { Entity } from '@prisma/client';

import { AgtRepository } from './agt.repository';
import { CreateEntityDto } from './dtos/create-entity.dto';

@Injectable()
export class AgtService {
  constructor(private agtRepository: AgtRepository) {}

  async getAllEntities(): Promise<Entity[]> {
    return await this.agtRepository.getAllEntities();
  }

  async getEntityByNif(nif: string): Promise<Entity | null> {
    return await this.agtRepository.getEntityByNif(nif);
  }

  async createEntity(createEntityDTO: CreateEntityDto): Promise<Entity> {
    const entity = await this.agtRepository.getEntityByNif(createEntityDTO.nif);

    if (entity) {
      throw new ConflictException('Já Existe uma entidade com este NIF!');
    }

    return await this.agtRepository.createEntity(createEntityDTO);
  }
}
