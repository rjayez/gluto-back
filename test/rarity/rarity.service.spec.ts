import { Test, TestingModule } from "@nestjs/testing";
import { RarityService } from "../../src/rarity/rarity.service";

describe("RarityService", () => {
  let service: RarityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RarityService],
    }).compile();

    service = module.get<RarityService>(RarityService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
