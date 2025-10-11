import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/common/dtos/users.dto';
import { PrismaService } from '@/services/prisma.service';
import { AgtService } from '../agt/agt.service';
import { ProfileDto } from '../profile/dtos/profile.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private agt: AgtService,
  ) {}

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('Usuário Não Encontrado!');
    }

    return user;
  }

  async getUserProfile(email: string): Promise<ProfileDto | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },

      omit: {
        id: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async createUser(data: CreateUserDto) {
    const { name, email, nif, password } = data;

    const agtEntity = await this.agt.getEntityByNif({
      nif,
    });

    if (!agtEntity) {
      throw new BadRequestException('Não existe um registro fiscal associada a este NIF!');
    }

    const userAlreadyExist = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExist) {
      throw new ConflictException('Já Existe uma conta associada a estas credencias!');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        nif,
        entityType: agtEntity.entityType,
        password,
      },
      omit: {
        password: true,
      },
    });

    return user;
  }
}
