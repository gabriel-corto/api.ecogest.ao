import { Controller, Get, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ProfileService } from './profile.service';

import type { ApiDataResponse } from '@/types/api';
import type { AuthRequest } from '@/types/request';

import { ProfileDto } from './dtos/profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/me')
  @ApiResponse({ status: 200, type: ProfileDto })
  async getProfile(@Req() req: AuthRequest): Promise<ApiDataResponse> {
    const { email } = req.user;
    const user = await this.profileService.getProfile(email);

    return {
      data: user,
    };
  }
}
