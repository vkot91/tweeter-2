import { GetUser } from 'auth/utils/get-user.decorator';
import { Resolver, Mutation, Args, Query, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GetUserInput, UpdateUserInput, User } from 'types/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'auth/utils/auth.guard';
import { PubSub } from 'graphql-subscriptions';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Query('user')
  user(@Args('getUserInput') getUserInput: GetUserInput) {
    return this.userService.findOne(getUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateUser')
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const user = await this.userService.update(updateUserInput);
    this.pubSub.publish('lastSeenUpdated', {
      lastSeenUpdated: {
        user,
      },
    });
    return user;
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }

  //TODO: LIST OF ONLINE USERS NOT ONLY FRIEND WITH POSSIBILTY AFFECT ONLY FRIENDS
  @Subscription('lastSeenUpdated', {})
  lastSeenUpdated() {
    return this.pubSub.asyncIterator('lastSeenUpdated');
  }
}
