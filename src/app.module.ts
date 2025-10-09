import { Module } from '@nestjs/common';
import { AgtModule } from './modules/agt/agt.module';

@Module({
  imports: [AgtModule],
  providers: [],
})
export class AppModule {}
