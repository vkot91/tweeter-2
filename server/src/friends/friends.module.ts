import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsResolver } from './friends.resolver';
import { PubSubModule } from 'pub-sub/pub-sub.module';

@Module({
  imports: [PubSubModule],
  providers: [FriendsResolver, FriendsService],
})
export class FriendsModule {}
