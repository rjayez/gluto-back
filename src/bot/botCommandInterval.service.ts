import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ChatClient } from "@twurple/chat";

@Injectable()
export class BotCommandIntervalService implements OnModuleInit {
  private readonly _30_MINUTES_IN_MS = 30 * 60 * 1000;

  constructor(@Inject("CHAT_CLIENT") private chatClient: ChatClient) {}

  onModuleInit(): void {
    this.messageOnInterval();
  }

  messageOnInterval(): void {
    setInterval(async _ => {
      await this.chatClient.say(
        "#letetryl",
        "Pour prolonger l'aventure, rejoignez les réseaux sociaux du stream : ✨ https://linktr.ee/Tetryl ✨"
      );
    }, this._30_MINUTES_IN_MS);
  }
}
