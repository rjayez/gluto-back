import { Module } from "@nestjs/common";
import { ConfigurationsService } from "./configurations.service";
import { ConfigurationsController } from "./configurationsController";
import { MongooseModule } from "@nestjs/mongoose";
import { Configurations, ConfigurationsSchema } from "./schema/configuration.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Configurations.name, schema: ConfigurationsSchema }])],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService],
})
export class ConfigurationsModule {}
