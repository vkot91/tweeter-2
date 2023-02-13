import { Resolver, Subscription } from '@nestjs/graphql';
import { SUBSCRIPTION_EVENTS } from './pub-sub.constants';
import { PubSubService } from './pub-sub.service';

@Resolver()
export class PubSubResolver {
  constructor(private readonly pubSubService: PubSubService) {}

  @Subscription(SUBSCRIPTION_EVENTS.lastSeenUpdated, {})
  lastSeenUpdated() {
    return this.pubSubService.subscribe(SUBSCRIPTION_EVENTS.lastSeenUpdated);
  }

  @Subscription(SUBSCRIPTION_EVENTS.friendshipMutated, {
    filter: (payload, variables) => {
      return payload.friendshipMutated.node.friend_id === variables.userId;
    },
  })
  friendshipMutated() {
    return this.pubSubService.subscribe(SUBSCRIPTION_EVENTS.friendshipMutated);
  }

  @Subscription(SUBSCRIPTION_EVENTS.postMutated, {
    filter: (payload, variables) => {
      return (
        payload.postMutated.node.post.ownerId === variables.userId &&
        payload.postMutated.node.ownerId !== variables.userId
      );
    },
  })
  postMutated() {
    return this.pubSubService.subscribe(SUBSCRIPTION_EVENTS.postMutated);
  }
}
