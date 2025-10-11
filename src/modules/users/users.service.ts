import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto, UserDto } from '@/common/dtos/users.dto';
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

  async getUserById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
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

  async getUserOtp(userId: string, otp: string) {
    const data = await this.prisma.otp.findUnique({
      where: {
        otp,
        AND: {
          userId,
        },
      },
    });

    if (!data) {
      throw new BadRequestException('Código OTP Não Encontrado!');
    }

    const isValidOtp = data.otp === otp;
    if (!isValidOtp) {
      throw new BadRequestException('Código OTP Inválido!');
    }

    const expiredOtp = new Date() > data.expires_at;
    if (expiredOtp) {
      throw new BadRequestException('Código OTP Expirado!');
    }

    const alreadyUsed = data.already_expired;
    if (alreadyUsed) {
      throw new BadRequestException('Este código OTP já foi utilizado!!');
    }

    return data;
  }

  async updateOtp(otpId: string) {
    await this.prisma.otp.update({
      data: {
        already_expired: true,
      },
      where: {
        id: otpId,
      },
    });
  }

  async verifyUserEmail(userId: string): Promise<UserDto> {
    return await this.prisma.user.update({
      data: {
        isEmailVerified: true,
      },
      where: {
        id: userId,
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUserIdentity(userId: string): Promise<UserDto> {
    return await this.prisma.user.update({
      data: {
        isIdentityVerified: true,
      },
      where: {
        id: userId,
      },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
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
