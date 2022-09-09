import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { FilesModule } from 'files/files.module';

@Module({
  imports: [FilesModule],
  providers: [PostResolver, PostService],
})
export class PostModule {}
