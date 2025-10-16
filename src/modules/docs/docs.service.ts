import { PrismaService } from '@/services/database/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateIdocDto } from './dtos/create-idoc.dto';

@Injectable()
export class DocsService {
  constructor(private prisma: PrismaService) {}

  async saveIdoc(data: CreateIdocDto, userId: string) {
    const { type, url } = data;

    return await this.prisma.idoc.create({
      data: {
        status: 'PENDING',
        url,
        type,
        entity: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
