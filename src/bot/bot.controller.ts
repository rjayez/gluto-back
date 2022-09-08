import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { BotCommandModoService } from "./bot-command-modo.service";
import { MessageDto } from "./dto/message.dto";

@Controller("bot")
export class BotController {
  constructor(private botService: BotCommandModoService) {}

  @Post("/chat")
  async postMessage(@Body() messageDto: MessageDto): Promise<void> {
    await this.botService.postMessage(messageDto.msg);
  }
}
