import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
