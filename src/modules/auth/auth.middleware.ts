import { AuthRequest } from '@/types/request';
import { TokenPayload } from '@/types/token';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: AuthRequest, res: Response, next: NextFunction) {
    const authToken = req.cookies.authToken as string;

    if (!authToken) {
      throw new UnauthorizedException('Unauthorized!');
    }

    try {
      const payload: TokenPayload = this.jwtService.verify(authToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      req.user = payload;
    } catch {
      throw new UnauthorizedException('Unauthorized!');
    }

    next();
  }
}
