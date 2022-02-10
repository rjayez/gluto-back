import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardsModule } from "./cards/cards.module";
import { TwitchModule } from "./twitch/twitch.module";
import { ConfigModule } from "@nestjs/config";
import { BotModule } from "./bot/bot.module";
import { CategoriesModule } from "./categories/categories.module";
import { SubcategoriesModule } from "./subcategories/subcategories.module";
import { SeriesController } from "./series/series.controller";
import { SeriesService } from "./series/series.service";
import { RarityModule } from "./rarity/rarity.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SeriesModule } from "./series/series.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PWD}@cluster0.jvbmq.mongodb.net/glutoDB`
    ),
    CardsModule,
    TwitchModule,
    BotModule,
    CategoriesModule,
    SubcategoriesModule,
    RarityModule,
    SeriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
