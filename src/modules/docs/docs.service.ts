import { PrismaService } from '@/services/database/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateIdocDto } from './dtos/create-idoc.dto';

@Injectable()
export class DocsService {
  constructor(private prisma: PrismaService) {}

  async save(data: CreateIdocDto) {
    const { type, url, userId } = data;

    return await this.prisma.idoc.create({
      data: {
        status: 'PENDING',
        url,
        type,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
