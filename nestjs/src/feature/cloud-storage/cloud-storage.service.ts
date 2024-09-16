import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudStorageService {
  private s3Client;
  constructor(public readonly configService: ConfigService) {
    this.s3Client = new S3Client();
  }

  createFolder(folderName: string) {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: folderName + '/',
    });

    return this.s3Client.send(command);
  }
}
