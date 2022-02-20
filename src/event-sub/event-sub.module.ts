import { Module } from "@nestjs/common";
import { EventSubService } from "./event-sub.service";
import { EventSubController } from "./event-sub.controller";
import { ChatClientModule } from "../bot/chat-client.module";

@Module({
  imports: [ChatClientModule],
  providers: [EventSubService],
  controllers: [EventSubController],
})
export class EventSubModule {}
