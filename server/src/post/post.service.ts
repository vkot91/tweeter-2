import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilesService } from 'files/files.service';
import { PrismaService } from 'prisma/prisma.service';

import {
  CreatePostInput,
  PaginationPostsInput,
  UpdatePostInput,
} from 'types/graphql';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async create(createPostInput: CreatePostInput, ownerId: number) {
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

  async getPosts(paginationPostsInput: PaginationPostsInput) {
    const { activePage, take, ownerId } = paginationPostsInput;
    const posts = await this.prisma.post.findMany({
      take: take,
      skip: (activePage - 1) * take,
      // where: {
      //   ownerId,
      // },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        owner: true,
      },
      // include: {
      //   author: {
      //     include: {
      //       ...userFollowsRelation,
      //     },
      //   },
      //   likes: {
      //     include: {
      //       user: {
      //         include: {
      //           ...userFollowsRelation,
      //         },
      //       },
      //     },
      //   },
      //   comments: {
      //     include: {
      //       user: {
      //         include: {
      //           ...userFollowsRelation,
      //         },
      //       },
      //     },
      //   },
      //   shares: {
      //     include: {
      //       user: {
      //         include: {
      //           ...userFollowsRelation,
      //         },
      //       },
      //     },
      //   },
      //   bookmarks: {
      //     include: {
      //       user: {
      //         include: {
      //           ...userFollowsRelation,
      //         },
      //       },
      //     },
      //   },
      // },
    });
    const totalCount = await this.prisma.post.count();
    const hasMore = totalCount > posts.length * activePage;

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
        },
      });
      return updatedPost;
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundException('Tweet with this id does not exists');
      }
    }
  }

  async remove(id: number) {
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
          throw new NotFoundException('Tweet with this id does not exists');
        }
      }
    }
  }

  private async getPostById(id: number) {
    const found = await this.prisma.post.findUnique({ where: { id } });

    if (!found)
      throw new NotFoundException('Tweet with this id does not exists');

    return found;
  }
}
