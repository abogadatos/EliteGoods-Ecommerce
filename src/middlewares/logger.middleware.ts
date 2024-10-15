import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class loggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = Date();
    const rightNow = now.toLocaleString();
    console.log(
      `Client did ${req.method} method on ${req.originalUrl} at ${rightNow}`,
    );
    next();
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  const now = Date();
  const rightNow = now.toLocaleString();
  console.log(
    `Client did ${req.method} method on ${req.originalUrl} at ${rightNow}`,
  );
  next();
}
