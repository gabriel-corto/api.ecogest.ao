import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '@/modules/auth/auth.controller';

import { AgtService } from '@/modules/agt/agt.service';
import { UsersService } from '@/modules/users/users.service';
import { OtpService } from '@/services/otp.service';

import { MailService } from '@/services/mail/mail.service';
import { PrismaService } from '@/services/prisma.service';
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
    OtpService,
    MailService,
    DocsService,
  ],
})
export class AuthModule {}
