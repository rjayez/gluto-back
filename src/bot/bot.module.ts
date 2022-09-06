import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotController } from "./bot.controller";
import { ChatClientModule } from "./chat-client.module";
import { ConfigurationsModule } from "../configuration/configurationsModule";

@Module({
  imports: [ChatClientModule, ConfigurationsModule],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
