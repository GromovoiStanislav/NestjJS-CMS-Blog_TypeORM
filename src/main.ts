import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.enableCors({
    origin: ["*"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }));
  await app.listen(3000);
}

bootstrap();
