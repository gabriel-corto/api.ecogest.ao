import { ApiPageDataResponseDto, ApiSuccessResponseDto } from '@/common/dtos/api.dto';
import { IdentificationDto, ParamDto } from '@/common/dtos/users.dto';
import { ApiDataResponse, ApiPageDataResponse, ApiSuccessResponse } from '@/types/api';
import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { GovernmentEntityDto, MetricsDto } from './dtos/identifications.dto';

@Controller('admin')
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get('/identifications')
  @ApiResponse({ status: 200, type: ApiPageDataResponseDto(IdentificationDto) })
  async getAllIdentifications(@Query() { q }: { q?: string }): Promise<ApiPageDataResponse> {
    const identifications = await this.admin.getIdentifications(q);
    return {
      data: identifications,
      metadata: {
        hasNextPage: false,
        hasPreviousPage: false,
        limit: 10,
        page: 0,
        totalItems: 0,
        totalPages: 0,
      },
    };
  }

  @Get('/government-entities')
  @ApiResponse({ status: 200, type: ApiPageDataResponseDto(GovernmentEntityDto) })
  async getGovernmentEntities(): Promise<ApiDataResponse> {
    const entities = await this.admin.getGovernmentEntities();
    return {
      data: entities,
    };
  }

  @Get('/identifications/metrics')
  @ApiResponse({ status: 200, type: ApiSuccessResponseDto(MetricsDto) })
  async getAllIdentificationsMetrics(): Promise<ApiSuccessResponse> {
    const { all, pendings, approveds, rejecteds } = await this.admin.getAllIdentificationsMetrics();
    return {
      data: {
        all: all,
        pendings: pendings,
        approveds: approveds,
        rejecteds: rejecteds,
      },
    };
  }

  @Patch('/identification/:id/approve')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: ApiSuccessResponseDto(IdentificationDto) })
  async updateIdentificationStatus(@Param() { id }: ParamDto): Promise<ApiSuccessResponse> {
    const identifications = await this.admin.approveIdentification(id);

    return {
      data: identifications,
      message: 'Identificação aprovada com sucesso!',
    };
  }

  @Patch('/identification/:id/reject')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: ApiSuccessResponseDto(IdentificationDto) })
  async rejectIdentificationStatus(@Param() { id }: ParamDto): Promise<ApiSuccessResponse> {
    const identifications = await this.admin.rejectIdentification(id);

    return {
      data: identifications,
      message: 'Identificação reprovada com sucesso!',
    };
  }
}
