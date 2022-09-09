import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(validationPayload: JwtPayload): Promise<User | null> {
    const { email, username } = validationPayload;
    const user = await this.prisma.user.findUnique({
      where: email ? { email } : { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
