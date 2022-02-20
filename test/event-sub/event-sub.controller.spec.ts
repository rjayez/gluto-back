import { Test, TestingModule } from "@nestjs/testing";
import { EventSubController } from "../../src/event-sub/event-sub.controller";

describe("EventSubController", () => {
  let controller: EventSubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventSubController],
    }).compile();

    controller = module.get<EventSubController>(EventSubController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
