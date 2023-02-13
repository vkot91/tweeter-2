import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { ISubscription } from 'types/graphql';
import { SUBSCRIPTION_EVENTS } from './pub-sub.constants';
import { PUB_SUB } from './pub-sub.module';

@Injectable()
export class PubSubService {
  constructor(
    @Inject(forwardRef(() => PUB_SUB))
    private readonly pubSubProvider: PubSub,
  ) {}

  public publish<
    SubFunctionName extends keyof Omit<ISubscription, '__typename'>,
  >(
    trigger: SUBSCRIPTION_EVENTS,
    payload: {
      [key in SubFunctionName]: ReturnType<ISubscription[SubFunctionName]>;
    },
  ) {
    this.pubSubProvider.publish(trigger, payload);
  }

  public subscribe(trigger: SUBSCRIPTION_EVENTS) {
    return this.pubSubProvider.asyncIterator(trigger);
  }
}
