import { MailPayload } from '@/types/schemas';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MailService {
  abstract send({ content, subject, to }: MailPayload): Promise<void>;
}
