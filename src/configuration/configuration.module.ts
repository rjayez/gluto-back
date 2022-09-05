import { Module } from "@nestjs/common";
import { ConfigurationsService } from "./configurations.service";
import { ConfigurationController } from "./configuration.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Configurations, ConfigurationsSchema } from "./schema/configuration.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Configurations.name, schema: ConfigurationsSchema }])],
  controllers: [ConfigurationController],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService],
})
export class ConfigurationModule {}
