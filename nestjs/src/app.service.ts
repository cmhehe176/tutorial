import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  test = () => {
    const hash = crypto
      .createHash('sha256')
      .update('I love cupcakes')
      .digest('hex');
    return hash;
  };
}
