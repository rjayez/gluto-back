import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ChatClient } from "@twurple/chat";
import { TwitchService } from "../twitch/twitch.service";

@Injectable()
export class BotCommandIntervalService implements OnModuleInit {
  private readonly _30_MINUTES_IN_MS = 30 * 60 * 1000;

  constructor(@Inject("CHAT_CLIENT") private chatClient: ChatClient, private readonly twitchService: TwitchService) {}

  onModuleInit(): void {
    this.messageOnInterval();
  }

  messageOnInterval(): void {
    setInterval(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async _ =>
        this.twitchService.tetrylIsLive()
        .then(async isLive => {
          if (isLive) {
            await this.chatClient.say(
              "#letetryl",
              "Pour prolonger l'aventure, rejoignez les réseaux sociaux du stream : ✨ https://linktr.ee/Tetryl ✨"
            );
          }
        }),
      this._30_MINUTES_IN_MS
    );
  }
}
