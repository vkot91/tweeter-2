import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'auth/utils/auth.guard';
import { GetUser } from 'auth/utils/get-user.decorator';
import { User } from 'types/graphql';
import { NotificationService } from './notification.service';

@Resolver('Notification')
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(GqlAuthGuard)
  @Query('notifications')
  findAll(@GetUser() user: User) {
    return this.notificationService.findAll(user);
  }
}
