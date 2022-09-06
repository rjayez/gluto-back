import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardsModule } from "./cards/cards.module";
import { TwitchModule } from "./twitch/twitch.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ConfigurationsModule } from "./configuration/configurationsModule";
import { BotModule } from "./bot/bot.module";
import { EventSubModule } from "./event-sub/event-sub.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PWD}@cluster0.jvbmq.mongodb.net/glutoDB`
    ),
    ConfigurationsModule,
    AuthModule,
    CardsModule,
    TwitchModule,
    BotModule,
    EventSubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
