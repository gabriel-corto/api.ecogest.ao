import { ApiDataResponse, ApiNoDataResponse, ApiPageDataResponse } from '@/types/api';
import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';

import { type AuthRequest } from '@/types/request';
import { CreateProjectDto } from './dtos/create-project.dto';
import { DeleteProjectDto } from './dtos/delete-project.dto';
import { GetProjectDto } from './dtos/get-project.dto';
import { ProjectsService } from './projects.service';

@Controller('entities/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async create(@Req() req: AuthRequest, @Body() body: CreateProjectDto): Promise<ApiDataResponse> {
    const userId = req.user.userId;
    const data = await this.projectsService.create(body, userId);

    return {
      data,
      message: 'Projecto criado com sucesso!',
    };
  }

  @Get()
  async findAll(): Promise<ApiPageDataResponse> {
    const data = await this.projectsService.findAll();

    return {
      data,
    };
  }

  @Get(':id')
  async findOne(@Param() param: GetProjectDto): Promise<ApiDataResponse> {
    const { id } = param;
    const data = await this.projectsService.findById(id);

    return {
      data,
    };
  }

  @Delete(':id')
  async delete(@Param() param: DeleteProjectDto): Promise<ApiNoDataResponse> {
    const { id } = param;
    await this.projectsService.delete(id);

    return {
      message: 'DELETED',
    };
  }
}
