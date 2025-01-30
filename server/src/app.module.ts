import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';

@Module({
  imports: [],
  controllers: [AppController, ChatController, MockController],
  providers: [AppService, ChatService, MockService],
})
export class AppModule {}
