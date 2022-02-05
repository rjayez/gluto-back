import { Controller, Get, Post } from "@nestjs/common";
import { TwitchService } from "./twitch.service";
import { StreamDto } from "./dto/stream.dto";
import { LE_TETRYL_ID } from "../constants";

@Controller("/twitch")
export class TwitchController {
  constructor(private readonly twitchService: TwitchService) {}

  @Get("/schedule")
  getWeekSchedule(): StreamDto[] {
    return this.twitchService.getWeekSchedule(LE_TETRYL_ID);
  }

  @Get("stream")
  GetStreamOnline() {
    return this.twitchService.getStreamPresent(LE_TETRYL_ID);
  }

  @Get("/notif")
  emitNotif() {}

  //TODO Déplacer dans un autre controller
  @Post("/notif")
  validTwitchSubscription() {}
}
