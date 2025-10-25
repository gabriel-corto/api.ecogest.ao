import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';

import { ProfileDto } from './dtos/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private usersService: UsersService) {}

  async getProfile(email: string): Promise<ProfileDto | null> {
    return await this.usersService.getUserProfile(email);
  }
}
