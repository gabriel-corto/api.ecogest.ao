import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto } from '@/common/dtos/users.dto';
import { PrismaService } from '@/services/prisma.service';
import { AgtService } from '../agt/agt.service';

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

  async createUser(data: CreateUserDto) {
    const { name, email, nif, entityType, password } = data;

    const userAgtEntity = await this.agt.getEntityByNif({
      nif,
    });

    const userAlreadyExist = await this.getUserByEmail(email);

    if (!userAgtEntity) {
      throw new BadRequestException('Não existe um registro fiscal associada a este NIF!');
    }

    if (userAlreadyExist) {
      throw new ConflictException('Já Existe uma conta associada a estas credencias!');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        nif,
        entityType,
        password,
      },
    });

    return user;
  }
}
