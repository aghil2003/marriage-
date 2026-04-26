import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let port = Number(process.env.PORT) || 3000;

  while (true) {
    try {
      await app.listen(port);
      console.log(`Nest app running at http://localhost:${port}`);
      break;
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== "EADDRINUSE") {
        throw err;
      }
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      port += 1;
    }
  }
}

bootstrap();
