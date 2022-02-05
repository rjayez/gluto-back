import { MessageDto } from "./message.dto";

describe("Message", () => {
  it("should be defined", () => {
    expect(new MessageDto()).toBeDefined();
  });
});
