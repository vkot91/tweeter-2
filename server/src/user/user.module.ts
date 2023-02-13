import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { FilesModule } from 'files/files.module';

@Module({
  imports: [FilesModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
