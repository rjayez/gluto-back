import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotController } from "./bot.controller";
import { ChatClientModule } from "./chat-client.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [ChatClientModule, AuthModule],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
