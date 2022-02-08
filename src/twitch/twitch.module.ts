import { Module } from "@nestjs/common";
import { TwitchController } from "./twitch.controller";
import { TwitchService } from "./twitch.service";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [],
  controllers: [TwitchController],
  providers: [TwitchService, AuthService],
})
export class TwitchModule {}
