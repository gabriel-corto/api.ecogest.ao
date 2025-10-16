import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto, UserDto } from '@/common/dtos/users.dto';
import { PrismaService } from '@/services/database/prisma.service';
import { AgtService } from '../agt/agt.service';
import { ProfileDto } from '../profile/dtos/profile.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private agt: AgtService,
  ) {}

  async getAllUsers() {
    return await this.prisma.user.findMany({
      omit: {
        password: true,
        updatedAt: true,
        createdAt: true,
        idocId: true,
        otpId: true,
      },
    });
  }

  async getAllIdentifications() {
    return await this.prisma.user.findMany({
      omit: {
        password: true,
        updatedAt: true,
        createdAt: true,
        idocId: true,
        otpId: true,
      },
      include: {
        idoc: true,
      },
      where: {
        role: 'COMPANY',
      },
    });
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
          user: {
            id: userId,
          },
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
        status: 'PENDING',
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

  async approveIdentification(id: string) {
    const data = await this.prisma.user.update({
      data: {
        status: 'VERIFIED',
      },
      where: {
        id,
      },
    });

    return data;
  }

  async rejectIdentification(id: string) {
    const data = await this.prisma.user.update({
      data: {
        status: 'REJECTED',
        //isIdentityVerified: false,
      },
      where: {
        id,
      },
    });

    return data;
  }

  async createUser(data: CreateUserDto) {
    const { name, email, nif, password, role } = data;

    const agtEntity = await this.agt.getEntityByNif({
      nif,
    });

    if (!agtEntity && role !== 'ADMIN') {
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

    return await this.prisma.user.create({
      data: {
        name,
        email,
        nif,
        role: role ? role : 'COMPANY',
        entityType: agtEntity.entityType,
        password,
      },
      omit: {
        password: true,
      },
    });
  }
}
