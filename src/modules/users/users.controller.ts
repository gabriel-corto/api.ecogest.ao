import { ApiPageDataResponseDto } from '@/common/dtos/api.dto';
import { UserDto } from '@/common/dtos/users.dto';
import { ApiPageDataResponse } from '@/types/api';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: ApiPageDataResponseDto(UserDto) })
  async getAllUsers(): Promise<ApiPageDataResponse> {
    const users = await this.usersService.findAllUsers();
    return {
      data: users,
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
}
