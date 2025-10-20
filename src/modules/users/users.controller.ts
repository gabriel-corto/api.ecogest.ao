import { ApiPageDataResponse } from '@/types/api';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
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
