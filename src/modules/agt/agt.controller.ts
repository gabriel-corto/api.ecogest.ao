import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiResponse } from '@nestjs/swagger';

import { AgtService } from './agt.service';
import { ApiPageDataResponse, ApiSuccessResponse } from '@/types/api';

import { GetSingleEntityDto } from './dtos/get-single-entity.dto';
import { GetEntitiesDto } from '@/modules/agt/dtos/get-entities.dto';
import { CreateEntityDto } from '@/modules/agt/dtos/create-entity.dto';

import { ApiPageDataResponseDto, ApiSuccessResponseDto } from '@/common/dtos/api.dto';

@Controller('agt')
export class AgtController {
  constructor(private agtService: AgtService) {}

  @Get('/entities')
  @ApiOkResponse({ type: ApiPageDataResponseDto(GetEntitiesDto) })
  async getEntities(): Promise<ApiPageDataResponse> {
    const entities = await this.agtService.getAllEntities();

    return {
      data: entities,
      metadata: {
        page: 0,
        limit: 5,
        totalPages: 0,
        totalItems: entities.length,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  @Get('/entities/:nif')
  @ApiOkResponse({ type: ApiSuccessResponseDto(GetEntitiesDto) })
  @ApiParam({
    name: 'nif',
  })
  async getEntity(@Param() { nif }: GetSingleEntityDto): Promise<ApiSuccessResponse> {
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
  @ApiResponse({
    status: 201,
    type: ApiSuccessResponseDto(GetEntitiesDto),
  })
  async createEntity(@Body() data: CreateEntityDto): Promise<ApiSuccessResponse> {
    const entity = await this.agtService.createEntity(data);

    return {
      data: {
        ...entity,
      },
      message: 'Entidade criada con sucesso!',
    };
  }
}
