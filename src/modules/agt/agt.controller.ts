import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiDataResponse, ApiSuccessResponse } from '@/types/api';
import { AgtService } from './agt.service';

import { AngolanNifDto } from '@/common/dtos/angolan-nif.dto';
import { CreateEntityDto } from '@/modules/agt/dtos/create-entity.dto';

@Controller('agt')
export class AgtController {
  constructor(private agtService: AgtService) {}

  @Get('/entities')
  async getEntities(): Promise<ApiDataResponse> {
    const entities = await this.agtService.getAllEntities();

    return {
      data: entities,
    };
  }

  @Get('/entities/:nif')
  async getEntity(@Param() { nif }: AngolanNifDto): Promise<ApiSuccessResponse> {
    const entity = await this.agtService.getEntityByNif({
      nif,
    });

    return {
      data: entity,
      message: 'Dados Fiscais carregado com sucesso!',
    };
  }

  @Post('/entities')
  async createEntity(@Body() data: CreateEntityDto): Promise<ApiSuccessResponse> {
    const entity = await this.agtService.createEntity(data);

    return {
      data: {
        ...entity,
      },
      message: 'Entidade cadastrada com sucesso!',
    };
  }
}
