import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { FilesModule } from 'files/files.module';
import { UserModule } from 'user/user.module';

@Module({
  imports: [FilesModule, UserModule],
  providers: [PostResolver, PostService],
})
export class PostModule {}
