import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { ProfileDto } from './dtos/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private usersService: UsersService) {}

  async getProfile(email: string): Promise<ProfileDto | null> {
    return await this.usersService.getUserProfile(email);
  }
}
