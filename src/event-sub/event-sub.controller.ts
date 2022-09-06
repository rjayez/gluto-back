import { Controller, ForbiddenException, HttpStatus, Post, Req } from "@nestjs/common";
import { EventSubService } from "./event-sub.service";
import { STATUS, SUBSCRIPTION_TYPE, TEST_REWARD_ID } from "./constants";
import { ConfigurationsService } from "../configuration/configurations.service";

@Controller("event-sub")
export class EventSubController {
  constructor(
    private readonly eventSubService: EventSubService,
    private readonly configurationService: ConfigurationsService
  ) {}

  private static readonly MESSAGE_TYPE_VERIFICATION = "webhook_callback_verification_pending";
  // TODO Decorator pour extraire les objets subscription
  @Post("")
  async subcribe(@Req() req) {
    // Vérifie que le message provient bien de Twitch avec le bon secret
    if (!this.eventSubService.verifyTwitchSubSignature(req.headers, req.body)) {
      console.warn("Rejeté");
      throw new ForbiddenException();
    }

    let subscription = req.body.subscription;

    const { status, type } = subscription;

    // Vérification d'une subscription d'event twitch
    if (status === EventSubController.MESSAGE_TYPE_VERIFICATION) {
      // Notification message types
      console.log("Verification pending");
      return req.body.challenge;
    }
    const eventSubEnabled = this.configurationService.eventSubEnabled;
    if (eventSubEnabled && subscription.status === STATUS.ENABLED) {
      let event = req.body.event;

      switch (type) {
        case SUBSCRIPTION_TYPE.FOLLOW:
          await this.eventSubService.eventChannelFollow(event);
          break;
        case SUBSCRIPTION_TYPE.STREAM_UP:
          await this.eventSubService.eventStreamUp();
          break;
        case SUBSCRIPTION_TYPE.STREAM_DOWN:
          await this.eventSubService.eventStreamDown();
          break;
        case SUBSCRIPTION_TYPE.SUB:
          await this.eventSubService.eventSub(event);
          break;
        case SUBSCRIPTION_TYPE.RESUB:
          await this.eventSubService.eventReSub(event);
          break;
        case SUBSCRIPTION_TYPE.SUB_GIFT:
          await this.eventSubService.eventSubGift(event);
          break;
        case SUBSCRIPTION_TYPE.RAID:
          if (subscription?.condition?.to_broadcaster_user_id) {
            await this.eventSubService.eventReceiveRaid(event);
          }
          if (subscription?.condition?.from_broadcaster_user_id) {
            await this.eventSubService.eventStartRaid(event);
          }
          break;
        case SUBSCRIPTION_TYPE.CUSTOM_REWARD_REDEMPTION:
          if (TEST_REWARD_ID === event.reward.id) {
            await this.eventSubService.eventCustomRewardRedemption(event);
          }
          break;
      }
    }

    return HttpStatus.NO_CONTENT;
  }
}
