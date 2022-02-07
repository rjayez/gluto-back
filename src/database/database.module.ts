import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { DatabaseController } from "./database.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PWD}@cluster0.jvbmq.mongodb.net/glutoDB`
    ),
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
