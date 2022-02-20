import { Test, TestingModule } from "@nestjs/testing";
import { EventSubService } from "../../src/event-sub/event-sub.service";

describe("EventSubService", () => {
  let service: EventSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventSubService],
    }).compile();

    service = module.get<EventSubService>(EventSubService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
