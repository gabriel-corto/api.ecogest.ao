import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

import { ApiDataResponse, ApiSuccessResponse } from '@/types/api';
import { AgtService } from './agt.service';

import { AngolanNifDto } from '@/common/dtos/angolan-nif.dto';
import { ApiDataResponseDto, ApiSuccessResponseDto } from '@/common/dtos/api.dto';
import { CreateEntityDto } from '@/modules/agt/dtos/create-entity.dto';
import { EntityDto } from '@/modules/agt/dtos/entities.dto';

@Controller('agt')
export class AgtController {
  constructor(private agtService: AgtService) {}

  @Get('/entities')
  @ApiResponse({ status: 200, type: ApiDataResponseDto(EntityDto) })
  async getEntities(): Promise<ApiDataResponse> {
    const entities = await this.agtService.getAllEntities();

    return {
      data: entities,
    };
  }

  @Get('/entities/:nif')
  @ApiResponse({ status: 200, type: ApiSuccessResponseDto(EntityDto) })
  @ApiParam({
    name: 'nif',
  })
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
  @ApiResponse({
    status: 201,
    type: ApiSuccessResponseDto(EntityDto),
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
