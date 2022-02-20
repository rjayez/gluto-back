import { Controller, ForbiddenException, HttpStatus, Post, Req } from "@nestjs/common";
import { EventSubService } from "./event-sub.service";

@Controller("event-sub")
export class EventSubController {
  constructor(private readonly eventSubService: EventSubService) {}

  private STATUS = {
    VERIFICATION: "webhook_callback_verification_pending",
    ENABLED: "enabled",
  };

  private SUBSCRIPTION_TYPE = {
    FOLLOW: "channel.follow",
    STREAM_UP: "stream.online",
    STREAM_DOWN: "stream.offline",
    SUB: "channel.subscribe",
    RESUB: "channel.subscription.message",
    SUB_GIFT: "channel.subscription.gift",
    RAID: "channel.raid",
  };

  private static readonly MESSAGE_TYPE_VERIFICATION = "webhook_callback_verification_pending";
  // TODO Decorator pour extraire les objets subscription
  @Post("")
  async subcribe(@Req() req) {
    // Vérifie que le message provient bien de Twitch avec le bon secret
    if (!this.eventSubService.verifyTwitchSubSignature(req.headers, req.body)) {
      console.log("Rejeté");
      throw new ForbiddenException();
    }

    let subscription = req.body.subscription;
    console.info("subscription", subscription);

    const { status, type } = subscription;
    console.debug("status", status);

    // Vérification d'une subscription d'event twitch
    if (status === EventSubController.MESSAGE_TYPE_VERIFICATION) {
      // Notification message types
      console.log("Verification pending");
      return req.body.challenge;
    }

    if (subscription.status === this.STATUS.ENABLED) {
      let event = req.body.event;
      console.debug("event", event);

      switch (type) {
        case this.SUBSCRIPTION_TYPE.FOLLOW:
          await this.eventSubService.eventChannelFollow(event);
          break;
        case this.SUBSCRIPTION_TYPE.STREAM_UP:
          await this.eventSubService.eventStreamUp();
          break;
        case this.SUBSCRIPTION_TYPE.STREAM_DOWN:
          await this.eventSubService.eventStreamDown();
          break;
        case this.SUBSCRIPTION_TYPE.SUB:
          await this.eventSubService.eventSub(event);
          break;
        case this.SUBSCRIPTION_TYPE.RESUB:
          await this.eventSubService.eventReSub(event);
          break;
        case this.SUBSCRIPTION_TYPE.SUB_GIFT:
          await this.eventSubService.eventSubGift(event);
          break;
        case this.SUBSCRIPTION_TYPE.RAID:
          if (subscription?.condition?.to_broadcaster_user_id) {
            await this.eventSubService.eventStartRaid(event);
          }
          if (subscription?.condition?.from_broadcaster_user_id) {
            await this.eventSubService.eventReceiveRaid(event);
          }
          break;
      }

      if (subscription.type === this.SUBSCRIPTION_TYPE.FOLLOW) {
        await this.eventSubService.eventChannelFollow(event);
      }
    }

    return HttpStatus.NO_CONTENT;
  }
}
