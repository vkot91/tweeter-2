import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PubSubService } from 'pub-sub/pub-sub.service';
import { CreateMessageInput, CreateRoomInput } from 'types/graphql';
import PrismaClient from '@prisma/client';
@Injectable()
export class ChatService {
  constructor(
    private readonly pubSubService: PubSubService,
    private prisma: PrismaService,
  ) {}

  createRoom(participantIds: number[]) {
    return this.prisma.room.create({
      data: {
        participants: {
          createMany: {
            data: [
              ...participantIds.map((item) => ({
                id: item,
              })),
            ],
          },
        },
      },
    });
  }

  createMessage(createMessageInput: CreateMessageInput, authorId: number) {
    const { roomId, text } = createMessageInput;
    return this.prisma.message.create({
      data: {
        authorId,
        roomId,
        text,
      },
    });
  }

  findAllRooms(userId: number) {
    console.log(userId);
    try {
      return this.prisma.room.findMany({
        where: {
          participants: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          messages: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOneRoom(id: number[]) {
    return this.prisma.room.findFirst({
      where: {
        participants: {
          some: {
            AND: [
              {
                id: id[0],
              },
              {
                id: id[1],
              },
            ],
          },
        },
      },
    });
  }

  update(id: number) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
