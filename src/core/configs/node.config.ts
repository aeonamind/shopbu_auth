import { registerAs } from '@nestjs/config';

export default registerAs('node', () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.NODE_PORT, 10) || 3000,
}));
