import nodemailer from 'nodemailer';

import { MailPayload } from '@/types/schemas';
import { Injectable } from '@nestjs/common';
import { MailService } from '../mail.service';

@Injectable()
export class NodemailerService implements MailService {
  async send({ content, subject, to }: MailPayload): Promise<void> {
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
}
