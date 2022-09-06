import { Module } from "@nestjs/common";
import { EventSubService } from "./event-sub.service";
import { EventSubController } from "./event-sub.controller";
import { ChatClientModule } from "../bot/chat-client.module";
import { ConfigurationsModule } from "../configuration/configurationsModule";

@Module({
  imports: [ChatClientModule, ConfigurationsModule],
  providers: [EventSubService],
  controllers: [EventSubController],
})
export class EventSubModule {}
