import { ResolveField, Resolver } from '@nestjs/graphql';
import { NotificationNode, NotificationType } from 'types/graphql';

@Resolver('NotificationNode')
export class NotificationNodeResolver {
  @ResolveField()
  __resolverType(value: NotificationNode) {
    if (value.__typename === NotificationType.Like) {
      return NotificationType.Like;
    }
    if (value.__typename === NotificationType.Share) {
      return NotificationType.Share;
    }
    if (value.__typename === NotificationType.Friendship) {
      return NotificationType.Friendship;
    }
    if (value.__typename === NotificationType.Comment) {
      return NotificationType.Comment;
    }
    return null;
  }
}
