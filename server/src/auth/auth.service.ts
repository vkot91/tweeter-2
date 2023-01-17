import { EmailService } from 'email/email.service';
import { PrismaService } from 'prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateUserInput,
  LoginInput,
  RestorePasswordInput,
} from 'types/graphql';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { JwtPayload } from './utils/jwt-payload.interface';

interface TokenResponse {
  email: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...restOptions } = createUserInput;
    const hashedPassword = await this.generateHadhedPassword(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          password: hashedPassword,
          ...restOptions,
        },
      });

      const token = await this.generateToken(user);
      this.emailService.sendVerificationEmailLink(user.email, token);
      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(
            'User with this email or username already exists',
          );
        }
      }
      throw e;
    }
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && !user.isEmailConfirmed) {
      throw new Error('User is not confirmed. Please check your email');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.generateToken(user);
      return {
        user,
        token,
      };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  async confirm(token: string) {
    const { email }: TokenResponse = this.jwtService.verify(token);
    if (!email) throw new UnauthorizedException();
    await this.prisma.user.update({
      where: { email },
      data: {
        isEmailConfirmed: true,
      },
    });
    return true;
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    const token = await this.generateToken(user);
    await this.emailService.sendVerificationEmailLink(email, token);
    return true;
  }

  async restorePassword(restorePasswordInput: RestorePasswordInput) {
    const { email, password } = restorePasswordInput;
    if (!email) throw new UnauthorizedException();
    const hashedPassword = await this.generateHadhedPassword(password);
    const updatedUser = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    const token = await this.generateToken(updatedUser);

    return {
      user: updatedUser,
      token,
    };
  }

  async checkIfUserConfirmed(user: User) {
    if (!user.isEmailConfirmed) {
      throw new NotFoundException('');
    }
    return user;
  }

  private async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      email: user.email,
      username: user.username,
    };
    const token: string = this.jwtService.sign(payload);
    return token;
  }

  private async generateHadhedPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
