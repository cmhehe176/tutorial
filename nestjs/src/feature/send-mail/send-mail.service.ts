import { Injectable } from '@nestjs/common';
import {
  SESClient,
  SendEmailCommand,
  VerifyEmailAddressCommand,
} from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { sendMailDto } from './send-mail.dto';

@Injectable()
export class SendMailService {
  private readonly sesClient;

  constructor(private config: ConfigService) {
    this.sesClient = new SESClient();
  }

  async sendMail(data: sendMailDto) {
    const { destination } = data;

    const command = new SendEmailCommand({
      Destination: destination,

      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: data.title,
        },

        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: data.data,
          },
        },
      },

      Source: this.config.get('EMAIL_SOURCE'),
    });

    await this.sesClient.send(command);

    return { message: 'success' };
  }

  async verifyEmailAddress(emailAddress: string) {
    const command = new VerifyEmailAddressCommand({
      EmailAddress: emailAddress,
    });

    await this.sesClient.send(command);

    return { message: 'success' };
  }
}
