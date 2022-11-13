import { Controller, Get, OnModuleInit } from "@nestjs/common";
import { TwitchService } from "./twitch.service";
import { StreamDto } from "./dto/stream.dto";
import { LE_TETRYL_ID } from "../constants";
import { ChatClient } from "@twurple/chat";

@Controller("/twitch")
export class TwitchController implements OnModuleInit {
  chatClient: ChatClient;

  constructor(private readonly twitchService: TwitchService) {}

  async onModuleInit() {}

  @Get("/schedule")
  getWeekSchedule(): StreamDto[] {
    return this.twitchService.getWeekSchedule(LE_TETRYL_ID);
  }

  @Get("stream")
  GetStreamOnline() {
    return this.twitchService.getStreamPresent(LE_TETRYL_ID).then(streamPresent => ({
      isLive: streamPresent,
    }));
  }

  @Get("/notif")
  emitNotif() {}
}
