import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from './modules/auth/auth.pb';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: protobufPackage,
      protoPath: 'src/proto/auth.proto',
    },
  });
  await app.listen();
}
bootstrap();
