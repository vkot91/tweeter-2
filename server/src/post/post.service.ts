import { ReactionEntities, UpdateReactionInput } from './../types/graphql';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilesService } from 'files/files.service';
import { PrismaService } from 'prisma/prisma.service';

import {
  GetPostsActionType,
  CreatePostInput,
  PaginationPostsInput,
  PostMutationType,
  UpdatePostInput,
} from 'types/graphql';
import { UserService } from 'user/user.service';
import { PubSubService } from 'pub-sub/pub-sub.service';
import { SUBSCRIPTION_EVENTS } from 'pub-sub/pub-sub.constants';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
    private usersService: UserService,
    private readonly pubSubService: PubSubService,
  ) {}

  async createPost(createPostInput: CreatePostInput, ownerId: number) {
    const { description, file: upload } = createPostInput;

    const fileName = await this.filesService.saveImageOnServer(upload?.file);
    const post = this.prisma.post.create({
      data: {
        description,
        image: fileName,
        ownerId,
      },
      include: {
        owner: true,
      },
    });
    return post;
  }

  async createLike(postId: number, ownerId: number) {
    await this.getPostById(postId);
    const like = await this.prisma.like.create({
      data: {
        postId,
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

    this.pubSubService.publish<'postMutated'>(SUBSCRIPTION_EVENTS.postMutated, {
      postMutated: {
        mutation: PostMutationType.LIKE_CREATED,
        node: {
          ...like,
          __typename: 'Like',
        },
      },
    });
    return like;
  }

  async createShare(postId: number, ownerId: number) {
    await this.getPostById(postId);
    const share = await this.prisma.share.create({
      data: {
        postId,
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
    this.pubSubService.publish<'postMutated'>(SUBSCRIPTION_EVENTS.postMutated, {
      postMutated: {
        mutation: PostMutationType.SHARE_CREATED,
        node: {
          ...share,
          __typename: 'Share',
        },
      },
    });

    return share;
  }

  async getPosts(paginationPostsInput: PaginationPostsInput) {
    const {
      activePage,
      take,
      ownerId,
      action = GetPostsActionType.friends,
    } = paginationPostsInput;

    const user = await this.usersService.getUserFriends(ownerId);
    const userFriendsIdsList = user.friendUserFriends.map((item) => {
      if (item.friend_id === ownerId) {
        return item.user_id;
      }
      if (item.user_id === ownerId) {
        return item.friend_id;
      }
    });

    user.userFriends.map((item) => {
      if (item.friend_id === ownerId) {
        userFriendsIdsList.push(item.user_id);
      }
      if (item.user_id === ownerId) {
        userFriendsIdsList.push(item.friend_id);
      }
    });

    const filter = {
      where: {},
    };

    if (action === GetPostsActionType.owner) {
      filter.where = {
        OR: [
          {
            ownerId,
          },
          {
            shares: {
              some: {
                ownerId,
              },
            },
          },
        ],
      };
    }
    if (action === GetPostsActionType.friends) {
      filter.where = {
        ownerId: {
          in: [...userFriendsIdsList, ownerId],
        },
      };
    }

    const posts = await this.prisma.post.findMany({
      include: {
        owner: true,
        likes: {
          include: {
            owner: true,
            post: true,
          },
        },
        shares: {
          include: {
            owner: true,
            post: true,
          },
        },
        comments: {
          include: {
            owner: true,
            post: true,
          },
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
      where: filter.where,
      take: take,
      skip: (activePage - 1) * take,
      orderBy: {
        updatedAt: 'desc',
      },
    });
    const totalCount = await this.prisma.post.count({
      where: filter.where,
    });

    const hasMore = posts.length >= take;

    return {
      items: posts,
      totalCount,
      hasMore,
    };
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const currentPost = await this.getPostById(id);

    if (
      (updatePostInput?.file === null || updatePostInput.file) &&
      currentPost.image
    ) {
      this.filesService.deleteImageFromServer(currentPost.image);
    }

    const { description } = updatePostInput;

    try {
      const fileName =
        updatePostInput?.file === null
          ? null
          : await this.filesService.saveImageOnServer(
              updatePostInput.file?.file,
            );

      const data = {
        description,
        ...((fileName === null || fileName?.length > 0) && { image: fileName }),
      };

      const updatedPost = await this.prisma.post.update({
        where: {
          id,
        },
        data: {
          ...data,
          updatedAt: new Date(),
        },
        include: {
          owner: true,
          likes: true,
          shares: true,
          comments: {
            include: {
              owner: true,
            },
          },
        },
      });
      return updatedPost;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Tweet with this id does not exists');
      }
    }
  }

  async removePost(id: number) {
    const currentPost = await this.getPostById(id);
    if (currentPost.image) {
      this.filesService.deleteImageFromServer(currentPost.image);
    }
    try {
      await this.prisma.post.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Post with this id does not exists');
        }
      }
    }
  }

  async removeLike(id: number) {
    try {
      const like = await this.prisma.like.delete({
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
            mutation: PostMutationType.LIKE_DELETED,
            node: {
              ...like,
              __typename: 'Like',
            },
          },
        },
      );

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Post with this id does not exists');
        }
      }
    }
  }

  async removeShare(id: number) {
    try {
      const share = await this.prisma.share.delete({
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
            mutation: PostMutationType.SHARE_DELETED,
            node: {
              ...share,
              __typename: 'Share',
            },
          },
        },
      );
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Post with this id does not exists');
        }
      }
    }
  }

  async updateReactionStatus(updateReactionInput: UpdateReactionInput) {
    const { type, id, checked } = updateReactionInput;
    try {
      if (type === ReactionEntities.Like) {
        await this.prisma.like.update({
          where: {
            id,
          },
          data: {
            checked,
          },
        });
        return true;
      }
      if (type === ReactionEntities.Share) {
        await this.prisma.share.update({
          where: {
            id,
          },
          data: {
            checked,
          },
        });
      }
      if (type === ReactionEntities.Comment) {
        await this.prisma.comment.update({
          where: {
            id,
          },
          data: {
            checked,
          },
        });
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException();
        }
      }
    }

    return true;
  }

  private async getPostById(id: number) {
    const found = await this.prisma.post.findUnique({ where: { id } });

    if (!found)
      throw new NotFoundException('Tweet with this id does not exists');

    return found;
  }
}
