import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentInput } from 'types/graphql';

//TODO: Add ws (subscriptions)
@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentInput: CreateCommentInput, ownerId: number) {
    try {
      const comment = await this.prisma.comment.create({
        data: {
          ...createCommentInput,
          ownerId,
        },
        include: {
          owner: true,
        },
      });
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
      await this.prisma.comment.delete({
        where: { id },
      });
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
