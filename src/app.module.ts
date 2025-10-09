import { Module } from '@nestjs/common';
import { AgtModule } from './modules/agt/agt.module';
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
  imports: [AgtModule, AuthModule],
  providers: [],
})
export class AppModule {}
