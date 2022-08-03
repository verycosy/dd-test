import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  warn() {
    this.logger.warn('WARN');
  }

  error() {
    try {
      throw new Error('CAN NOT CREATE');
    } catch (err) {
      this.logger.error(
        {
          data: {
            userId: 3,
          },
          reason: 'CONFLICTED',
        },
        err.stack,
      );
    }
  }

  log() {
    this.logger.log('LOG');
  }

  verbose() {
    this.logger.verbose('VERBOSE');
  }

  debug() {
    this.logger.verbose('DEBUG');
  }
}
