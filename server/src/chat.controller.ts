import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MockService } from './mock.service';
import { ChatCompletionMessageParam } from 'openai/resources';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly mockService: MockService,
  ) {}

  @Post()
  async post(
    @Body() body: { messages: ChatCompletionMessageParam[] },
  ): Promise<ChatCompletionMessageParam[]> {
    console.log('Received body:', body); // Debugging to see the received payload
    const retrivalData = this.mockService.getMockData();
    return await this.chatService.prepareMyDay(retrivalData, body.messages);
  }

  @Get('test')
  async test(): Promise<ChatCompletionMessageParam[]> {
    const retrivalData = this.mockService.getMockData();
    return await this.chatService.prepareMyDay(retrivalData, [
      { role: 'user', content: 'how is the weather' },
    ]);
  }
}
