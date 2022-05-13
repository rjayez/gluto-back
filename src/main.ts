import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import { CORS_OPTIONS } from "./constants";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(CORS_OPTIONS);
  console.info("ENV HTTPS_PROXY", process.env.HTTPS_PROXY);
  app.use(helmet());
  app.set("trust proxy", 1);

  await app.listen(process.env.PORT);
}

bootstrap();
