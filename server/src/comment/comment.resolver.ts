import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'auth/utils/auth.guard';
import { GetUser } from 'auth/utils/get-user.decorator';
import { User } from 'types/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from 'types/graphql';

@UseGuards(GqlAuthGuard)
@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation('createComment')
  create(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @GetUser() user: User,
  ) {
    return this.commentService.create(createCommentInput, user.id);
  }

  @Mutation('removeComment')
  remove(@Args('id') id: number) {
    return this.commentService.remove(id);
  }
}
