import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'auth/utils/auth.guard';
import { GetUser } from 'auth/utils/get-user.decorator';
import { CreateMessageInput, CreateRoomInput, User } from 'types/graphql';
import { ChatService } from './chat.service';

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation('createRoom')
  create(
    @Args('createRoomInput') createRoomInput: CreateRoomInput,
    @GetUser() user: User,
  ) {
    return this.chatService.createRoom([
      createRoomInput.participantId,
      user.id,
    ]);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createMessage')
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @GetUser() user: User,
  ) {
    return this.chatService.createMessage(createMessageInput, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query('rooms')
  findRooms(@GetUser() user: User) {
    return this.chatService.findAllRooms(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query('room')
  findOne(@GetUser() authedUser: User, participantId: number) {
    return this.chatService.findOneRoom([authedUser.id, participantId]);
  }

  @Mutation('updateMessage')
  update() {}

  @Mutation('removeMessage')
  remove(@Args('id') id: number) {
    return this.chatService.remove(id);
  }
}
