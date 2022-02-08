import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class EventSubMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
    EventSubMiddleware;
  }
}
