import { Body, Controller, Get, Post } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get()
  getMockData(): string {
    return this.mockService.getMockData();
  }

  @Get('gen')
  async gen(): Promise<string> {
    return await this.mockService.gen();
  }

  @Post()
  post(@Body() body: { data: string }): string {
    return this.mockService.setMockData(body.data);
  }
}
