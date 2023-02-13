import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FriendsService } from './friends.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'auth/utils/auth.guard';
import { GetUser } from 'auth/utils/get-user.decorator';
import { CreateFriendshipInput, UpdateStatusInput, User } from 'types/graphql';

@Resolver('Friend')
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(GqlAuthGuard)
  @Query('friendships')
  friendships(@Args('userId') userId: number) {
    return this.friendsService.getFriends(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createFriendship')
  create(
    @Args('createFriendshipInput') createFriendshipInput: CreateFriendshipInput,
    @GetUser() user: User,
  ) {
    return this.friendsService.create(createFriendshipInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateCreator')
  updateCreator(@Args('id') id: number, @GetUser() mainUser: User) {
    return this.friendsService.updateCreator(id, mainUser);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('removeFriendship')
  remove(@Args('id') id: number, @GetUser() user: User) {
    return this.friendsService.remove(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateStatus')
  update(
    @Args('updateStatusInput') updateStatusInput: UpdateStatusInput,
    @GetUser() user: User,
  ) {
    return this.friendsService.updateStatus(updateStatusInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query('friendsRequests')
  findUserFriendRequest(@GetUser() user: User) {
    return this.friendsService.findUnconfirmed(user);
  }
}
