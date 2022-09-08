import { Module } from "@nestjs/common";
import { BotCommandModoService } from "./bot-command-modo.service";
import { BotController } from "./bot.controller";
import { ChatClientModule } from "./chat-client.module";
import { ConfigurationsModule } from "../configuration/configurationsModule";
import { BotCommandPublicService } from "./botCommandPublic.service";
import { BotCommandIntervalService } from "./botCommandInterval.service";

@Module({
  imports: [ChatClientModule, ConfigurationsModule],
  controllers: [BotController],
  providers: [BotCommandModoService, BotCommandPublicService, BotCommandIntervalService],
})
export class BotModule {}
