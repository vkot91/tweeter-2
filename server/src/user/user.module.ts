import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { FilesModule } from 'files/files.module';
import { PubSubModule } from 'pub-sub/pub-sub.module';

@Module({
  imports: [FilesModule, PubSubModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
