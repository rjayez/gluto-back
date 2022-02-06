import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import { CORS_OPTIONS } from "./constants";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: CORS_OPTIONS });
  app.use(helmet());
  await app.listen(5000);
}
process.on("uncaughtException", err => {
  Logger.warn(err, "LOGGER", false);
});

bootstrap();
