import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardsModule } from "./cards/cards.module";
import { TwitchModule } from "./twitch/twitch.module";
import { ConfigModule } from "@nestjs/config";
import { BotModule } from "./bot/bot.module";
import { EventSubController } from "./event-sub/event-sub.controller";
import { EventSubService } from "./event-sub/event-sub.service";
import { EventSubModule } from "./event-sub/event-sub.module";

@Module({
  imports: [CardsModule, TwitchModule, BotModule, ConfigModule.forRoot({ envFilePath: ".env" }), EventSubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
