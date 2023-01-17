import { GetUser } from 'auth/utils/get-user.decorator';
import { PrismaService } from 'prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetUserInput, Status, UpdateUserInput, User } from 'types/graphql';
import { FilesService } from 'files/files.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async findOne(getUserInput: GetUserInput) {
    const findKeys = Object.entries(getUserInput).map((item) => {
      return {
        [item[0]]: item[1],
      };
    }) as GetUserInput;
    try {
      const user = await this.prisma.user.findUnique({
        where: { ...findKeys[0] },
        include: {
          friendUserFriends: {
            include: {
              user: true,
              friend: true,
            },
          },
          userFriends: {
            include: {
              user: true,
              friend: true,
            },
          },
        },
      });
      if (!user) {
        return new NotFoundException('User with this username does not exist');
      }
      return {
        ...user,
        friends: [...user.friendUserFriends, ...user.userFriends],
      };
    } catch (error) {}
  }

  async update(updateUserInput: UpdateUserInput) {
    const fileName =
      updateUserInput?.avatar === null
        ? null
        : await this.filesService.saveImageOnServer(
            updateUserInput.avatar?.file,
          );

    const data = {
      ...updateUserInput,
      ...((fileName === null || fileName?.length > 0) && { avatar: fileName }),
    };

    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: data.id,
        },
        data,
      });

      return updatedUser;
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(
            `Oops, looks like user with this ${e.meta.target[0]} already exists. Please choose another one`,
          );
        }
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUserById(id: number) {
    const found = await this.prisma.user.findUnique({
      where: { id },
      include: {
        friendUserFriends: true,
        posts: true,
      },
    });

    if (!found)
      throw new NotFoundException('User with this id does not exists');

    return found;
  }

  async getUserFriends(id: number) {
    const found = await this.prisma.user.findUnique({
      where: { id },
      include: {
        friendUserFriends: {
          where: {
            status: Status.CONFIRMED,
          },
        },
        userFriends: {
          where: {
            status: Status.CONFIRMED,
          },
        },
      },
    });
    if (!found)
      throw new NotFoundException('User with this id does not exists');

    return found;
  }
}
