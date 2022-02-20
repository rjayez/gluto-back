import { Controller, ForbiddenException, Get, HttpStatus, OnModuleInit, Post, Req } from "@nestjs/common";
import { TwitchService } from "./twitch.service";
import { StreamDto } from "./dto/stream.dto";
import { LE_TETRYL_ID } from "../constants";
import { ChatClient } from "@twurple/chat";
import { AuthService } from "../auth/auth.service";
import { getRandomNumber } from "../utils/utils";

const MESSAGE_POINTS = [
  "Ah ! T'aimes jouer avec ce point de chaine %s !",
  "Arrête de jouer %s !",
  "T'as vu %s, ça fait rien ;)",
  "%s, tu aimes dépenser des points de chaine pour rien.",
  "Oh, t'as appris à utiliser les points de chaine, bravo le veau",
  "Tiens, ton chat joue sur le clavier ?",
  "Chérie, les viewers jouent avec les points de chaine",
  "Ok, vu.",
];

const TEST_REWARD_ID = "0a111137-52d4-405e-a510-70731abf8fcc";

const MESSAGE_TYPE_VERIFICATION = "webhook_callback_verification_pending";

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

  //TODO Déplacer dans un autre controller

  @Post("/notif")
  async validTwitchSubscription(@Req() req) {
    // Vérifie que le message provient bien de Twitch avec le bon secret
    if (!this.twitchService.verifyTwitchSubSignature(req.headers, req.body)) {
      console.log("Rejeté");
      throw new ForbiddenException();
    }
    console.log("BODY", req.body);
    const randomMessage = getRandomNumber(0, MESSAGE_POINTS.length);

    // Vérification d'une subscription d'event twitch
    if (req.body?.subscription?.status === MESSAGE_TYPE_VERIFICATION) {
      // Notification message types
      console.log("Verification pending");
      return req.body.challenge;
    }

    let subscription = req.body.subscription;
    if (subscription.status === "enabled") {
      let event = req.body.event;

      console.log("Notif reçu !!!");
      // io.emit("notif", { pseudo: req.body.event.user_name });
      if (
        subscription.type === "channel.channel_points_custom_reward_redemption.add" &&
        TEST_REWARD_ID === event.reward.id
      ) {
        await this.chatClient.say("letetryl", MESSAGE_POINTS[randomMessage].replace("%s", event.user_name));
      }

      return HttpStatus.NO_CONTENT;
    }
  }
}
