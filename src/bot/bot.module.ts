import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { AuthService } from "../auth/auth.service";
import { BotController } from "./bot.controller";

@Module({
  imports: [],
  controllers: [BotController],
  providers: [BotService, AuthService],
})
export class BotModule {}
