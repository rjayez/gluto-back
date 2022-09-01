import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { CardsModule } from "../cards/cards.module";
import { UsersController } from "./users.controller";
import { CollectionCard, CollectionCardSchema } from "./schema/collectionCard.schema";
import { Card, CardSchema } from "../cards/schema/card.schema";
import { SocketService } from "./socket.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: CollectionCard.name, schema: CollectionCardSchema },
      { name: Card.name, schema: CardSchema },
    ]),
    CardsModule,
  ],
  providers: [UsersService, SocketService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
