import { Injectable } from '@nestjs/common';
import { FriendsService } from 'friends/friends.service';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationType, User } from 'types/graphql';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private friendsService: FriendsService,
  ) {}
  async findAll(user: User) {
    const friendships = await this.prisma.friends.findMany({
      where: {
        friend_id: user.id,
        status: 'PENDING',
      },
      include: {
        user: true,
        friend: true,
      },
    });
    const transformedFriendsRequests = this.friendsService
      .transformFriends(friendships, user.id)
      .map((item) => ({
        ...item,
        __typename: NotificationType.Friendship,
      }));

    const postReactions = await this.prisma.post.findMany({
      where: { ownerId: user.id },
      include: {
        likes: {
          where: {
            checked: false,
          },
          include: {
            owner: true,
            post: true,
          },
        },
        shares: {
          where: {
            checked: false,
          },
          include: {
            owner: true,
            post: true,
          },
        },
        comments: {
          where: {
            checked: false,
            NOT: {
              ownerId: user.id,
            },
          },
          include: {
            owner: true,
            post: true,
          },
        },
      },
    });

    const likes = postReactions.flatMap((item) => item.likes);
    const shares = postReactions.flatMap((item) => item.shares);
    const comments = postReactions.flatMap((item) => item.comments);

    const transformedLikes = likes.map((item) => ({
      ...item,
      __typename: NotificationType.Like,
    }));

    const transformedShares = shares.map((item) => ({
      ...item,
      __typename: NotificationType.Share,
    }));

    const transformedComments = comments.map((item) => ({
      ...item,
      __typename: NotificationType.Comment,
    }));

    return [
      {
        type: NotificationType.Friendship,
        nodes: transformedFriendsRequests,
      },
      {
        type: NotificationType.Like,
        nodes: transformedLikes,
      },
      {
        type: NotificationType.Share,
        nodes: transformedShares,
      },
      {
        type: NotificationType.Comment,
        nodes: transformedComments,
      },
    ];
  }
}
