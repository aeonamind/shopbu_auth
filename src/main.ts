import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NodeConfig } from './configs/node.config';
import { ConfigName } from './constants/config-name.constant';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nodeConfig = app.get(ConfigService).get<NodeConfig>(ConfigName.Node);
  app.setGlobalPrefix('/api');

  app.use(cookieParser());
  await app.listen(nodeConfig.port);
}
bootstrap();
