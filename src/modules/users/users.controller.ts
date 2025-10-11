import { ApiPageDataResponseDto } from '@/common/dtos/api.dto';
import { UserDto } from '@/common/dtos/users.dto';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @ApiResponse({ status: 200, type: ApiPageDataResponseDto(UserDto) })
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
