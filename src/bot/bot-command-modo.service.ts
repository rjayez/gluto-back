import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ChatClient } from "@twurple/chat";
import { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage";
import { ConfigurationsService } from "../configuration/configurations.service";

@Injectable()
export class BotCommandModoService implements OnModuleInit {
  constructor(
    @Inject("CHAT_CLIENT") private chatClient: ChatClient,
    private readonly configurationService: ConfigurationsService
  ) {}

  async postMessage(msg: string) {
    await this.chatClient.say("#letetryl", msg).catch(err => console.error(err));
  }

  async onModuleInit(): Promise<any> {
    this.chatClient.onMessage(async (channel: string, user: string, message: string, msg: TwitchPrivateMessage) => {
      if (msg.userInfo.isMod && message.toLowerCase() === "!test") {
        await this.chatClient.say(channel, "Ceci est une commande de test Local letetrBravoGlutoBot");
      }

      if ((msg.userInfo.isMod || msg.userInfo.isBroadcaster) && message.toLowerCase() === "!onoffcmd") {
        if (this.configurationService.botCommandEnabled) {
          this.configurationService.botCommandEnabled = false;
          await this.chatClient.say(
            channel,
            "Pour les biens de la modérations, les commandes sont désactivés temporairement. Merci de votre compréhension letetrComfy"
          );
        } else {
          this.configurationService.botCommandEnabled = true;
          await this.chatClient.say(channel, "Les commandes sont de nouveaux disponibles letetrDanse letetrDanse");
        }
      }

      if ((msg.userInfo.isMod || msg.userInfo.isBroadcaster) && message.toLowerCase() === "!onoffnotif") {
        if (this.configurationService.eventSubEnabled) {
          this.configurationService.eventSubEnabled = false;
          await this.chatClient.say(
            channel,
            "Pour les biens de la modérations, les notifications de type follow/sub/raid sont désactivés temporairement. Merci de votre compréhension letetrComfy"
          );
        } else {
          this.configurationService.eventSubEnabled = true;
          await this.chatClient.say(channel, "Les notifications sont de nouveaux disponibles letetrDanse letetrDanse");
        }
      }
    });
  }
}
