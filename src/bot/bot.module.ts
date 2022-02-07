import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotController } from "./bot.controller";
import { ChatClientModule } from "./chat-client.module";

@Module({
  imports: [ChatClientModule],
  controllers: [BotController],
  providers: [BotService, AuthService],
})
export class BotModule {}
