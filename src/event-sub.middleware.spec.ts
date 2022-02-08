import { EventSubMiddleware } from './event-sub.middleware';

describe('EventSubMiddleware', () => {
  it('should be defined', () => {
    expect(new EventSubMiddleware()).toBeDefined();
  });
});
