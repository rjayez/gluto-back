import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { DatabaseController } from "./database.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: ".env" })],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
