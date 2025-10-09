import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiResponse } from '@nestjs/swagger';

import { ApiDataResponse, ApiSuccessResponse } from '@/types/api';
import { AgtService } from './agt.service';

import { CreateEntityDto } from '@/modules/agt/dtos/create-entity.dto';
import { GetEntitiesDto } from '@/modules/agt/dtos/get-entities.dto';
import { GetSingleEntityDto } from './dtos/get-single-entity.dto';

import { ApiDataResponseDto, ApiSuccessResponseDto } from '@/common/dtos/api.dto';

@Controller('agt')
export class AgtController {
  constructor(private agtService: AgtService) {}

  @Get('/entities')
  @ApiOkResponse({ type: ApiDataResponseDto(GetEntitiesDto) })
  async getEntities(): Promise<ApiDataResponse> {
    const entities = await this.agtService.getAllEntities();

    return {
      data: entities,
    };
  }

  @Get('/entities/:nif')
  @ApiOkResponse({ type: ApiSuccessResponseDto(GetEntitiesDto) })
  @ApiParam({
    name: 'nif',
  })
  async getEntity(@Param() { nif }: GetSingleEntityDto): Promise<ApiSuccessResponse> {
    const entity = await this.agtService.getEntityByNif(nif);

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
      message: 'Entidade cadastrada com sucesso!',
    };
  }
}
