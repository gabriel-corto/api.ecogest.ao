import { CreateEntityDTO } from '@/modules/agt/dtos/create-entity.dto';

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { ApiDataResponse, ApiSuccessResponse } from '@/types/api';
import { AgtService } from './agt.service';
import { GetEntitiesDTO } from './dtos/get-entities.dto';
import { GetEntityDTO } from './dtos/get-entity.dto';

@Controller('agt')
export class AgtController {
  constructor(private agtService: AgtService) {}

  @Get('/entities')
  @ApiOperation({ summary: 'get all agt entities' })
  @ApiOkResponse({ type: GetEntitiesDTO, isArray: true })
  async getEntities(): Promise<ApiDataResponse> {
    const entities = await this.agtService.getAllEntities();

    return {
      // data: entities,
    };
  }

  @Get('/entities/:nif')
  @ApiOperation({ summary: 'get single agt entity' })
  @ApiParam({
    name: 'nif',
  })
  async getEntity(@Param() { nif }: GetEntityDTO): Promise<ApiSuccessResponse> {
    const entity = await this.agtService.getEntityByNif(nif);

    if (!entity) {
      throw new NotFoundException('Entidatde não encontrada!');
    }

    return {
      data: entity,
      message: 'Dados Fiscais carregado com sucesso!',
    };
  }

  @Post('/entities')
  @ApiOperation({ summary: 'create agt entity' })
  @ApiResponse({
    status: 201,
    type: CreateEntityDTO,
    description: 'Entidade criada com sucesso!',
  })
  async createEntity(
    @Body() data: CreateEntityDTO,
  ): Promise<ApiSuccessResponse> {
    const entity = await this.agtService.createEntity(data);

    return {
      data: {
        ...entity,
      },
      message: 'Entidade criada con sucesso!',
    };
  }
}
