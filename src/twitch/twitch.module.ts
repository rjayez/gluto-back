import { Module } from "@nestjs/common";
import { TwitchController } from "./twitch.controller";
import { TwitchService } from "./twitch.service";

@Module({
  imports: [],
  controllers: [TwitchController],
  providers: [TwitchService],
  exports: [TwitchService],
})
export class TwitchModule {}
