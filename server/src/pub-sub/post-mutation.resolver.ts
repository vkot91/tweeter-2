import { ResolveField, Resolver } from '@nestjs/graphql';
import { ReactionEntities, PostMutatedNode } from 'types/graphql';

@Resolver('PostMutatedNode')
export class PostMutatedNodeResolver {
  @ResolveField()
  __resolverType(value: PostMutatedNode) {
    if (value.__typename === ReactionEntities.Like) {
      return ReactionEntities.Like;
    }
    if (value.__typename === ReactionEntities.Share) {
      return ReactionEntities.Share;
    }
    if (value.__typename === ReactionEntities.Comment) {
      return ReactionEntities.Comment;
    }
    return null;
  }
}
