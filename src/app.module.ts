import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardsModule } from "./cards/cards.module";
import { TwitchModule } from "./twitch/twitch.module";
import { ConfigModule } from "@nestjs/config";
import { BotModule } from "./bot/bot.module";

@Module({
  imports: [CardsModule, TwitchModule, BotModule, ConfigModule.forRoot({ envFilePath: ".env" })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
