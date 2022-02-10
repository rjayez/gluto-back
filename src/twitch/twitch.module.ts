import { Module } from "@nestjs/common";
import { TwitchController } from "./twitch.controller";
import { TwitchService } from "./twitch.service";
import { ChatClientModule } from "../bot/chat-client.module";

@Module({
  imports: [ChatClientModule],
  controllers: [TwitchController],
  providers: [TwitchService],
})
export class TwitchModule {}
