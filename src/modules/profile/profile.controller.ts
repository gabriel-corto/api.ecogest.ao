import { Controller, Get, Req } from '@nestjs/common';

import { ProfileService } from './profile.service';

import type { ApiDataResponse } from '@/types/api';
import type { AuthRequest } from '@/types/request';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/me')
  async getProfile(@Req() req: AuthRequest): Promise<ApiDataResponse> {
    const { email } = req.user;
    const user = await this.profileService.getProfile(email);

    return {
      data: user,
    };
  }
}
