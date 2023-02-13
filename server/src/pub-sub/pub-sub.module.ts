import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PostMutatedNodeResolver } from './post-mutation.resolver';
import { PubSubResolver } from './pub-sub.resolver';
import { PubSubService } from './pub-sub.service';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useFactory: () => new PubSub(),
    },
    PubSubResolver,
    PubSubService,
    PostMutatedNodeResolver,
  ],
  exports: [PubSubService],
})
export class PubSubModule {}
