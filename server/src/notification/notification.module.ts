import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { FriendsModule } from 'friends/friends.module';
import { NotificationNodeResolver } from './notification-node.resolver';

@Module({
  imports: [FriendsModule],
  providers: [
    NotificationNodeResolver,
    NotificationResolver,
    NotificationService,
  ],
})
export class NotificationModule {}
