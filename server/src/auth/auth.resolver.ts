import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import {
  CreateUserInput,
  LoginInput,
  RestorePasswordInput,
} from 'types/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './utils/auth.guard';
import { GetUser } from './utils/get-user.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('register')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.create(createUserInput);
  }

  @Mutation('login')
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation('confirm')
  confirm(@Args('token') token: string) {
    return this.authService.confirm(token);
  }

  @Mutation('forgotPassword')
  forgotPassword(@Args('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Mutation('restorePassword')
  restorePassword(
    @Args('restorePasswordInput') restorePasswordInput: RestorePasswordInput,
  ) {
    return this.authService.restorePassword(restorePasswordInput);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async me(@GetUser() user: User) {
    return this.authService.checkIfUserConfirmed(user);
  }
}
