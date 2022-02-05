import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import { CORS_OPTIONS } from "./constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: CORS_OPTIONS });
  app.use(helmet());
  await app.listen(5000);
}
bootstrap();
