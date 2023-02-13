import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GetUserInput, UpdateUserInput } from 'types/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'auth/utils/auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  user(@Args('getUserInput') getUserInput: GetUserInput) {
    return this.userService.findOne(getUserInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateUser')
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
