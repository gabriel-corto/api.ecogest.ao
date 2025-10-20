import { ParamDto } from '@/common/dtos/users.dto';
import { ApiDataResponse, ApiPageDataResponse, ApiSuccessResponse } from '@/types/api';
import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get('/identifications')
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
  async getGovernmentEntities(): Promise<ApiDataResponse> {
    const entities = await this.admin.getGovernmentEntities();
    return {
      data: entities,
    };
  }

  @Get('/identifications/metrics')
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
  async updateIdentificationStatus(@Param() { id }: ParamDto): Promise<ApiSuccessResponse> {
    const identifications = await this.admin.approveIdentification(id);

    return {
      data: identifications,
      message: 'Identificação aprovada com sucesso!',
    };
  }

  @Patch('/identification/:id/reject')
  @ApiParam({ name: 'id' })
  async rejectIdentificationStatus(@Param() { id }: ParamDto): Promise<ApiSuccessResponse> {
    const identifications = await this.admin.rejectIdentification(id);

    return {
      data: identifications,
      message: 'Identificação reprovada com sucesso!',
    };
  }
}
