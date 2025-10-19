import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(private userService: UsersService) {}

  async getIdentifications(q?: string) {
    return this.userService.findAllIdentifications(q);
  }
  async getGovernmentEntities() {
    return this.userService.findAllGovernmentsEntities();
  }

  async getAllIdentificationsMetrics() {
    return this.userService.getIdentificationMetrics();
  }

  async approveIdentification(id: string) {
    return this.userService.approveIdentification(id);
  }

  async rejectIdentification(id: string) {
    return this.userService.rejectIdentification(id);
  }
}
