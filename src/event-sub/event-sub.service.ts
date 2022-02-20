import { Inject, Injectable } from "@nestjs/common";
import { sha256 } from "js-sha256";
import { ChatClient } from "@twurple/chat";

@Injectable()
export class EventSubService {
  constructor(@Inject("CHAT_CLIENT") private readonly chatClient: ChatClient) {}

  verifyTwitchSubSignature(headers, body): boolean {
    const HMAC_PREFIX = "sha256=";
    const messageId = headers["twitch-eventsub-message-id"];
    const messageTimestamp = headers["twitch-eventsub-message-timestamp"];
    const signature = headers["twitch-eventsub-message-signature"];
    const message = messageId + messageTimestamp + JSON.stringify(body);

    //get Hmac
    const hmacMessage = HMAC_PREFIX + sha256.hmac(process.env.TWITCH_EVENTSUB_SECRET, message);

    return hmacMessage === signature;
  }

  async eventChannelFollow(event: any) {
    await this.chatClient.say(
      "#letetryl",
      `letetrBienvenue Bienvenue à toi @${event?.user_name} ! Merci pour ton follow ! Tu rejoins notre petit groupe d'aventuriers ! letetrBienvenue`
    );

    // TODO Rajouter total follow
    // await this.chatClient.say(
    //   "#letetryl",
    //   `letetrBienvenue Bienvenue à toi @${event?.user_name} ! Merci pour ton follow ! Tu rejoins notre petit groupe de (total follow) aventuriers ! letetrBienvenue `
    // );
  }

  async eventStreamUp() {
    await this.chatClient.say("#letetryl", "Le Tétryl est en ligne, et c’est grâce à qui ? letetrBravoGlutoBot");
  }

  async eventStreamDown() {
    await this.chatClient.say(
      "#letetryl",
      "Encore un stream bien rempli, je m’en vais faire une petite sieste bien méritée ! Pour les prochains lives n’hésitez pas à taper la commande !planning dans le tchat. letetrBravoGlutoBot"
    );
  }

  async eventStartRaid(event: any) {
    await this.chatClient.say(
      "#letetryl",
      `Tous à bord, nous partons en raid vers la chaîne de ${event.to_broadcaster_user_name} ! letetrComfy`
    );
  }

  async eventReceiveRaid(event: any) {
    await this.chatClient.say(
      "#letetryl",
      `Merci pour ton raid ${event.from_broadcaster_user_name} ! On a justement prévu ${event.viewers} sièges en plus pour vous ! letetrLurk`
    );
  }

  async eventSub(event: any) {
    if (!event.is_gift) {
      await this.chatClient.say(
        "#letetryl",
        `Woaaah ! letetrAAAH Merci pour ton sub @${event.user_name} tu déchires ! Plein d’amour sur toi letetrCoeur`
      );
    }
  }

  async eventReSub(event: any) {
    await this.chatClient.say(
      "#letetryl",
      `Oh mais dis-donc, @${event.user_name} vient de passer niveau ${event.cumulative_months} ! 
      Merci pour ton soutien letetrCoeur letetrCoeur letetrCoeur`
    );
  }

  async eventSubGift(event: any) {
    await this.chatClient.say(
      "#letetryl",
      `letetrCoeur L’incroyable @${event.user_name} offre ${event.total} sub${
        event.total > 1 && "s"
      }. Merci à toi, tu déchires ! letetrDanse letetrDanse letetrDanse`
    );
  }
}
