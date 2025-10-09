import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[] | []> {
    return await this.prisma.user.findMany();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const { name, nif, email, password, entityType } = user;

    return await this.prisma.user.create({
      data: {
        name,
        nif,
        email,
        password,
        entityType,
      },
    });
  }
}
