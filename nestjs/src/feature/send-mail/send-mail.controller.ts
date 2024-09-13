import { Body, Controller, Post } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { sendMailDto } from './send-mail.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('send-mail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Public()
  @Post()
  sendMail(@Body() data: sendMailDto) {
    return this.sendMailService.sendMail(data);
  }

  @Public()
  @Post('test')
  verifyEmail(@Body() emailAddress: string) {
    return this.sendMailService.verifyEmailAddress(emailAddress);
  }
}
