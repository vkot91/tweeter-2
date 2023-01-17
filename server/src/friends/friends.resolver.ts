import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { FriendsService } from './friends.service';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'auth/utils/auth.guard';
import { GetUser } from 'auth/utils/get-user.decorator';
import { PubSub } from 'graphql-subscriptions';
import { CreateFriendshipInput, UpdateStatusInput, User } from 'types/graphql';

@Resolver('Friend')
export class FriendsResolver {
  constructor(
    private readonly friendsService: FriendsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query('friendships')
  async friendships(@Args('userId') userId: number) {
    return await this.friendsService.getFriends(userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createFriendship')
  async create(
    @Args('createFriendshipInput') createFriendshipInput: CreateFriendshipInput,
    @GetUser() user: User,
  ) {
    const friendship = await this.friendsService.create(
      createFriendshipInput,
      user,
    );

    this.pubSub.publish('friendshipMutated', {
      friendshipMutated: {
        mutation: 'CREATED',
        node: friendship,
      },
    });
    return friendship;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateCreator')
  async updateCreator(@Args('id') id: number) {
    const friendship = await this.friendsService.updateCreator(id);
    this.pubSub.publish('friendshipMutated', {
      friendshipMutated: {
        mutation: 'CREATED',
        node: {
          ...friendship,
          requestCreator: true,
        },
      },
    });
    return friendship;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('removeFriendship')
  async remove(@Args('id') id: number, @GetUser() user: User) {
    const friendship = await this.friendsService.remove(id, user);
    this.pubSub.publish('friendshipMutated', {
      friendshipMutated: {
        mutation: 'DELETED',
        node: friendship,
      },
    });
    return friendship;
  }

  @Subscription('friendshipMutated', {
    filter: (payload, variables) => {
      return payload.friendshipMutated.node.friend_id === variables.userId;
    },
  })
  friendshipMutated() {
    return this.pubSub.asyncIterator('friendshipMutated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateStatus')
  update(@Args('updateStatusInput') updateStatusInput: UpdateStatusInput) {
    return this.friendsService.updateStatus(updateStatusInput);
  }
  // @UseGuards(GqlAuthGuard)
  // @Query('friends')
  // findUserFriendRequest(@GetUser() user: User) {
  //   return this.friendsService.findUnconfirmed(user);
  // }

  @UseGuards(GqlAuthGuard)
  @Query('friendsRequests')
  findUserFriendRequest(@GetUser() user: User) {
    return this.friendsService.findUnconfirmed(user);
  }
}

//Fetch friends
//Friend login - set friend updated lastSeen
