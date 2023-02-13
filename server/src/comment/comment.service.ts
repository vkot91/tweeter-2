import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SUBSCRIPTION_EVENTS } from 'pub-sub/pub-sub.constants';
import { PubSubService } from 'pub-sub/pub-sub.service';
import { CreateCommentInput, PostMutationType } from 'types/graphql';

//TODO: Add ws (subscriptions)
@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private readonly pubSubService: PubSubService,
  ) {}

  async create(createCommentInput: CreateCommentInput, ownerId: number) {
    try {
      const comment = await this.prisma.comment.create({
        data: {
          ...createCommentInput,
          ownerId,
        },
        include: {
          owner: true,
          post: {
            include: {
              owner: true,
            },
          },
        },
      });

      this.pubSubService.publish<'postMutated'>(
        SUBSCRIPTION_EVENTS.postMutated,
        {
          postMutated: {
            mutation: PostMutationType.COMMENT_CREATED,
            node: {
              ...comment,
              __typename: 'Comment',
            },
          },
        },
      );

      return comment;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if ((error.code = 'P2003')) {
          throw new NotFoundException(`Post with this id does not exists`);
        }
      }
    }
  }

  async remove(id: number) {
    try {
      const comment = await this.prisma.comment.delete({
        where: { id },
        include: {
          owner: true,
          post: {
            include: {
              owner: true,
            },
          },
        },
      });

      this.pubSubService.publish<'postMutated'>(
        SUBSCRIPTION_EVENTS.postMutated,
        {
          postMutated: {
            mutation: PostMutationType.COMMENT_DELETED,
            node: {
              ...comment,
              __typename: 'Comment',
            },
          },
        },
      );

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Comment with this id does not exists');
        }
      }
    }
  }
}
