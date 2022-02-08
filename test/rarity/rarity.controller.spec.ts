import { Test, TestingModule } from "@nestjs/testing";
import { RarityController } from "../../src/rarity/rarity.controller";
import { RarityService } from "../../src/rarity/rarity.service";

describe("RarityController", () => {
  let controller: RarityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RarityController],
      providers: [RarityService],
    }).compile();

    controller = module.get<RarityController>(RarityController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
