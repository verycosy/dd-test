import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/error')
  testError() {
    this.appService.error();

    return 'this is error';
  }

  @Get('/log')
  testLog() {
    this.appService.log();
  }

  @Get('/verbose')
  testVerbose() {
    this.appService.verbose();
  }

  @Get('/debug')
  testDebug() {
    this.appService.debug();
  }

  @Get('/warn')
  testWarn() {
    this.appService.warn();
  }

  @Get('/combined')
  combined() {
    this.appService.warn();
    this.appService.error();
    this.appService.log();
    this.appService.verbose();
    this.appService.debug();
  }

  @Get('/exception')
  exception() {
    throw new Error('Exception');
  }

  @Post('/')
  testPost() {
    return 'wow';
  }
}
