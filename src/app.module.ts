import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AgtModule } from '@/modules/agt/agt.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [AuthModule, UsersModule, AgtModule, ProfileModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'agt/entities', method: RequestMethod.GET },
        { path: '/agt/entities/:nif', method: RequestMethod.GET },

        { path: 'auth/sign-in', method: RequestMethod.POST },
        { path: 'auth/sign-up', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
