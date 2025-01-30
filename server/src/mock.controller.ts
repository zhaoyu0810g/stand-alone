import { Controller, Get, Post } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get()
  async getMockData(): Promise<string>  {
    return this.mockService.getMockData();
  }

  @Get("gen")
  async gen(): Promise<string>  {
    return this.mockService.gen();
  }

  @Post("gen")
  async update(data: string): Promise<string>  {
    return this.mockService.setMockData(data);
  }
}
