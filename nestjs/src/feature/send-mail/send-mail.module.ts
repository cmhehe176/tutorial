import { Module } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { SendMailController } from './send-mail.controller';

@Module({
  controllers: [SendMailController],
  providers: [SendMailService],
})
export class SendMailModule {}
