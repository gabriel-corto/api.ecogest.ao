import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@/modules/auth/auth.controller';

import { AgtService } from '@/modules/agt/agt.service';
import { UsersService } from '@/modules/users/users.service';

import { PrismaService } from '@/services/database/prisma.service';
import { MailService } from '@/services/mail/mail.service';
import { NodemailerService } from '@/services/mail/providers/nodemailer.service';
import { DocsService } from '../docs/docs.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    AgtService,
    PrismaService,
    {
      provide: MailService,
      useClass: NodemailerService,
    },
    DocsService,
  ],
})
export class AuthModule {}
