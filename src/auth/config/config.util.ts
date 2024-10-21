import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class ConfigUtil {
  static clientURL: string;

  static setConfig(config: any) {
    this.clientURL = config.client.clientURL;
  }
}
