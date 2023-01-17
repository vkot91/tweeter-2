import { Injectable, NotFoundException } from '@nestjs/common';
import { Friends, Prisma, User as PrismaUser } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateFriendshipInput,
  Status,
  UpdateStatusInput,
  User,
} from 'types/graphql';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async getFriends(userId: number) {
    const friendsData = await this.prisma.friends.findMany({
      where: {
        OR: [
          {
            user_id: userId,
          },
          {
            friend_id: userId,
          },
        ],
      },
      include: {
        user: true,
        friend: true,
      },
    });
    return this.transformFriends(friendsData, userId);
  }

  async create(createFriendShipInput: CreateFriendshipInput, mainUser: User) {
    const friendship = await this.prisma.friends.create({
      data: {
        user_id: mainUser.id,
        friend_id: createFriendShipInput.friend_id,
      },
      include: {
        user: true,
        friend: true,
      },
    });
    return this.transformFriends([friendship], mainUser.id)[0];
  }

  async updateStatus(updateStatusInput: UpdateStatusInput) {
    const { id, status } = updateStatusInput;
    const friendship = await this.prisma.friends.findUnique({
      where: { id },
    });
    try {
      await this.prisma.friends.update({
        where: { id },
        data: {
          status: friendship.attemptsCount >= 5 ? Status.BLOCKED : status,
          updatedAt: new Date(),
          attemptsCount: (() => {
            switch (status) {
              case Status.PENDING: {
                return friendship.attemptsCount + 1;
              }
              case Status.CONFIRMED: {
                return 1;
              }
              default: {
                return friendship.attemptsCount;
              }
            }
          })(),
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateCreator(id: number) {
    try {
      const friendship = await this.prisma.friends.findUnique({
        where: { id },
      });

      const updatedFriendship = await this.prisma.friends.update({
        where: {
          id,
        },
        data: {
          ...friendship,
          updatedAt: new Date(),
          friend_id: friendship.user_id,
          user_id: friendship.friend_id,
          status: Status.PENDING,
          attemptsCount: 1,
        },
        include: {
          friend: true,
          user: true,
        },
      });
      return updatedFriendship;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Relation with this id does not exists');
        }
      }
    }
  }

  async findUnconfirmed(user: User) {
    const friendShips = await this.prisma.friends.findMany({
      where: {
        friend_id: user.id,
        status: 'PENDING',
      },
      include: {
        user: true,
        friend: true,
      },
    });
    return this.transformFriends(friendShips, user.id);
  }

  async remove(id: number, user: User) {
    try {
      const friendship = await this.prisma.friends.delete({
        where: {
          id,
        },
        include: {
          user: true,
          friend: true,
        },
      });
      return this.transformFriends([friendship], user.id)[0];
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Relation with this id does not exists');
        }
      }
    }
  }

  private transformFriends = (
    data: (Friends & {
      user: PrismaUser;
      friend: PrismaUser;
    })[],
    userId: number,
  ) => {
    return data.map((item) => {
      if (item.user_id === userId) {
        const { user, user_id, ...restFriendship } = item;
        return {
          ...restFriendship,
          requestCreator: true,
        };
      }
      if (item.friend_id === userId) {
        const { user, user_id, ...restFriendship } = item;
        return {
          ...restFriendship,
          friend_id: user_id,
          friend: user,
          requestCreator: false,
        };
      }
    });
  };
}
