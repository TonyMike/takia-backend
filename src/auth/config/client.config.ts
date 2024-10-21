import { registerAs } from '@nestjs/config';

export default registerAs('client', () => ({
  clientURL: process.env.CLIENT_URL,
}));
