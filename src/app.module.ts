import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { AgtModule } from './modules/agt/agt.module';

@Module({
  imports: [AuthModule, UsersModule, AgtModule],
  providers: [],
})
export class AppModule {}
