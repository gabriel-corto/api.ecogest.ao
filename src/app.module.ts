import { Module } from '@nestjs/common';

import { AgtModule } from '@/modules/agt/agt.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, AgtModule],
  providers: [],
})
export class AppModule {}
