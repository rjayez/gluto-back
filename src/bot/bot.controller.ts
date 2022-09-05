import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { BotService } from "./bot.service";
import { MessageDto } from "./dto/message.dto";

@Controller("bot")
export class BotController {
  constructor(private botService: BotService) {}

  @Post("/chat")
  async postMessage(@Body() messageDto: MessageDto): Promise<void> {
    await this.botService.postMessage(messageDto.msg);
  }
}
