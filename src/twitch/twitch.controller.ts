import { Controller, Get, OnModuleInit } from "@nestjs/common";
import { TwitchService } from "./twitch.service";
import { StreamDto } from "./dto/stream.dto";
import { LE_TETRYL_ID } from "../constants";
import { ChatClient } from "@twurple/chat";
import { AuthService } from "../auth/auth.service";

@Controller("/twitch")
export class TwitchController implements OnModuleInit {
  chatClient: ChatClient;

  constructor(private readonly twitchService: TwitchService, private readonly authService: AuthService) {
    const staticAuthProvider = this.authService.getStaticAuthProvider();
    this.chatClient = new ChatClient({ authProvider: staticAuthProvider, channels: ["letetryl", "romanus89"] });
  }

  async onModuleInit() {
    await this.chatClient.connect();
  }

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
}
