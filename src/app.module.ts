import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardsModule } from "./cards/cards.module";
import { TwitchModule } from "./twitch/twitch.module";
import { ConfigModule } from "@nestjs/config";
import { BotModule } from "./bot/bot.module";
import { EventSubModule } from "./event-sub/event-sub.module";

@Module({
  imports: [CardsModule, TwitchModule, BotModule, ConfigModule.forRoot({ envFilePath: ".env" }), EventSubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
