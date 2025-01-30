import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MockService } from './mock.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService, private readonly mockService: MockService) {}

  @Get()
  async getHello(): Promise<string>  {
    const retrivalData = this.mockService.getMockData();
    return this.chatService.prepareMyDay(retrivalData);
  }
}
