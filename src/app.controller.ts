import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // Просто обратиться на path : http://localhost:1010
  getHello() {
    return this.appService.getHello();
  }
}
