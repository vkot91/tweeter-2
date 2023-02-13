import { Injectable, NotFoundException } from '@nestjs/common';
import { Friends, Prisma, User as PrismaUser } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SUBSCRIPTION_EVENTS } from 'pub-sub/pub-sub.constants';
import { PubSubService } from 'pub-sub/pub-sub.service';
import {
  CreateFriendshipInput,
  FriendshipMutationType,
  Status,
  UpdateStatusInput,
  User,
} from 'types/graphql';

@Injectable()
export class FriendsService {
  constructor(
    private prisma: PrismaService,
    private readonly pubSubService: PubSubService,
  ) {}

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

    const transformed = this.transformFriends([friendship], mainUser.id)[0];

    this.pubSubService.publish<'friendshipMutated'>(
      SUBSCRIPTION_EVENTS.friendshipMutated,
      {
        friendshipMutated: {
          node: {
            ...transformed,
            status: transformed.status as Status,
          },
          mutation: FriendshipMutationType.CREATED,
        },
      },
    );
    return transformed;
  }

  async updateStatus(updateStatusInput: UpdateStatusInput, user: User) {
    const { id, status } = updateStatusInput;
    const friendship = await this.prisma.friends.findUnique({
      where: { id },
    });
    try {
      const updatedFriendship = await this.prisma.friends.update({
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
        include: {
          user: true,
          friend: true,
        },
      });

      const transformed = this.transformFriends(
        [updatedFriendship],
        user.id,
      )[0];

      this.pubSubService.publish<'friendshipMutated'>(
        SUBSCRIPTION_EVENTS.friendshipMutated,
        {
          friendshipMutated: {
            node: {
              ...transformed,
              status: transformed.status as Status,
            },
            mutation: FriendshipMutationType.UPDATED,
          },
        },
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateCreator(id: number, mainUser: User) {
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

      const transformed = this.transformFriends(
        [updatedFriendship],
        mainUser.id,
      )[0];

      this.pubSubService.publish<'friendshipMutated'>(
        SUBSCRIPTION_EVENTS.friendshipMutated,
        {
          friendshipMutated: {
            node: {
              ...transformed,
              status: transformed.status as Status,
              requestCreator: true,
            },
            mutation: FriendshipMutationType.CREATED,
          },
        },
      );

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

      const transformed = this.transformFriends([friendship], user.id)[0];

      this.pubSubService.publish<'friendshipMutated'>(
        SUBSCRIPTION_EVENTS.friendshipMutated,
        {
          friendshipMutated: {
            node: {
              ...transformed,
              status: transformed.status as Status,
            },
            mutation: FriendshipMutationType.DELETED,
          },
        },
      );
      return transformed;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Relation with this id does not exists');
        }
      }
    }
  }

  transformFriends(
    data: (Friends & {
      user: PrismaUser;
      friend: PrismaUser;
    })[],
    userId: number,
  ) {
    return data.map((item) => {
      if (item.user_id === userId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user, user_id: __, ...restFriendship } = item;
        return {
          ...restFriendship,
          requestCreator: true,
          requestCreatorInfo: user,
        };
      }
      if (item.friend_id === userId) {
        const { user, user_id, ...restFriendship } = item;
        return {
          ...restFriendship,
          friend_id: user_id,
          friend: user,
          requestCreator: false,
          requestCreatorInfo: user,
        };
      }
    });
  }
}
