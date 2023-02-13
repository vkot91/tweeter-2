import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'auth/utils/auth.guard';
import { GetUser } from 'auth/utils/get-user.decorator';

import {
  CreatePostInput,
  PaginationPostsInput,
  UpdatePostInput,
  UpdateReactionInput,
  User,
} from 'types/graphql';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(GqlAuthGuard)
  @Query('posts')
  getPosts(
    @Args('paginationPostsInput') paginationPostsInput: PaginationPostsInput,
  ) {
    return this.postService.getPosts(paginationPostsInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createPost')
  create(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @GetUser() user: User,
  ) {
    return this.postService.createPost(createPostInput, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createLike')
  async createLike(@Args('postId') postId: number, @GetUser() user: User) {
    return await this.postService.createLike(postId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createShare')
  createShare(@Args('postId') postId: number, @GetUser() user: User) {
    return this.postService.createShare(postId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updatePost')
  update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('removePost')
  removePost(@Args('id') id: number) {
    return this.postService.removePost(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('removeLike')
  removeLike(@Args('id') id: number) {
    return this.postService.removeLike(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('removeShare')
  removeShare(@Args('id') id: number) {
    return this.postService.removeShare(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateReaction')
  updateReaction(
    @Args('updateReactionInput') updateReactionInput: UpdateReactionInput,
  ) {
    return this.postService.updateReactionStatus(updateReactionInput);
  }
}
