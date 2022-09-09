import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetUserInput, UpdateUserInput } from 'types/graphql';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOne(getUserInput: GetUserInput) {
    const findKeys = Object.entries(getUserInput).map((item) => {
      return {
        [item[0]]: item[1],
      };
    }) as GetUserInput;
    return this.prisma.user.findUnique({
      where: { ...findKeys[0] },
    });
  }

  update(updateUserInput: UpdateUserInput) {
    return `This action updates a #${updateUserInput.id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
