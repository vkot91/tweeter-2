import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'auth/utils/auth.guard';
import { GetUser } from 'auth/utils/get-user.decorator';

import {
  CreatePostInput,
  PaginationPostsInput,
  UpdatePostInput,
  User,
} from 'types/graphql';
import { PostService } from './post.service';

@UseGuards(GqlAuthGuard)
@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation('createPost')
  create(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @GetUser() user: User,
  ) {
    return this.postService.createPost(createPostInput, user.id);
  }

  @Mutation('createLike')
  createLike(@Args('postId') postId: number, @GetUser() user: User) {
    return this.postService.createLike(postId, user.id);
  }

  @Mutation('createShare')
  createShare(@Args('postId') postId: number, @GetUser() user: User) {
    return this.postService.createShare(postId, user.id);
  }

  @Query('posts')
  getPosts(
    @Args('paginationPostsInput') paginationPostsInput: PaginationPostsInput,
  ) {
    return this.postService.getPosts(paginationPostsInput);
  }

  @Mutation('updatePost')
  update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation('removePost')
  removePost(@Args('id') id: number) {
    return this.postService.removePost(id);
  }

  @Mutation('removeLike')
  removeLike(@Args('id') id: number) {
    return this.postService.removeLike(id);
  }

  @Mutation('removeShare')
  removeShare(@Args('id') id: number) {
    return this.postService.removeShare(id);
  }
}
