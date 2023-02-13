import { Injectable } from '@nestjs/common';
import { Post, Share, Like } from '@prisma/client';
import { FriendsService } from 'friends/friends.service';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationType, User } from 'types/graphql';

type RelationType = {
  likes: (Like & {
    post: Post;
    owner: User;
  })[];
  shares: (Share & {
    post: Post;
    owner: User;
  })[];
  comments: (Comment & {
    post: Post;
    owner: User;
  })[];
};

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

    const relations = ['likes', 'shares', 'comments'].reduce(
      (acc, curr) => (
        (acc[curr] = {
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
        }),
        acc
      ),
      {},
    );

    const postReactions = (await this.prisma.post.findMany({
      where: { ownerId: user.id },
      select: relations,
    })) as RelationType[];

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
