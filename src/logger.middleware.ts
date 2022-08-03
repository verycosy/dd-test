import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface HttpIncomingLog {
  method: string;
  originalUrl: string;
  userAgent: string;
  ip: string;
  body?: Record<string, any>;
}

@Injectable()
export class LoggderMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();

    const { ip, method, originalUrl, body } = req;
    const userAgent = req.get('user-agent') || '';

    const message: HttpIncomingLog = {
      method,
      originalUrl,
      userAgent,
      ip,
    };

    if (method === 'POST') {
      message.body = body;
    }

    this.logger.log(message);

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log({
        statusCode,
        contentLength,
        responseTime: Date.now() - now,
      });
    });

    next();
  }
}
