import { MailPayload, type OtpMailTemplate } from '@/types/schemas';
import { Injectable } from '@nestjs/common';

import nodemailer from 'nodemailer';
import { generateOtpMailTemplate } from './templates/otp.mail';

@Injectable()
export class MailService {
  async send({ content, subject, to }: MailPayload) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_SERVICE_USERNAME,
        pass: process.env.MAIL_SERVICE_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"ECOGEST" <geral.ecogest.ao@gmail.com>',
      to,
      subject,
      html: content,
    });
  }

  otpMail({ otp, user }: OtpMailTemplate): string {
    return generateOtpMailTemplate({ otp, user });
  }
}
