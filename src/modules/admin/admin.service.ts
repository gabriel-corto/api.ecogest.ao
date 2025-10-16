import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(private userService: UsersService) {}

  async getIdentifications() {
    return this.userService.getAllIdentifications();
  }

  async approveIdentification(id: string) {
    return this.userService.approveIdentification(id);
  }

  async rejectIdentification(id: string) {
    return this.userService.rejectIdentification(id);
  }
}
