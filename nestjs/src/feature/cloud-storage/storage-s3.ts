import {
  _Object,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import * as archiver from 'archiver';
import { basename } from 'node:path';
import { PassThrough } from 'node:stream';
import { GetSignedUrlDto } from './cloud-storage.dto';
import { CloudStorageInterface } from './cloud-storage.interface';

export class S3Storage implements CloudStorageInterface {
  public readonly client = new S3Client();

  constructor(public readonly configService: ConfigService) {}

  createFolder(folderName: string) {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: folderName + '/',
    });

    return this.client.send(command);
  }

  async changeFolderName({
    oldName,
    newName,
  }: {
    oldName: string;
    newName: string;
  }) {
    const bucketName = this.configService.get('AWS_S3_BUCKET');

    const copyCommand = new CopyObjectCommand({
      CopySource: bucketName + '/' + oldName + '/',
      Bucket: bucketName,
      Key: newName + '/',
    });

    await this.client.send(copyCommand);

    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: oldName + '/',
    });

    await this.client.send(deleteCommand);
  }

  async getFiles(folderName: string) {
    const bucketName = this.configService.get('AWS_S3_BUCKET');
    const prefix = folderName + '/';

    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    });

    const files = await this.client.send(listCommand);

    return files.Contents?.filter((item) => item.Key !== prefix);
  }

  async copyFolder({ oldName, newName }: { oldName: string; newName: string }) {
    const files: _Object[] = await this.getFiles(oldName);

    await Promise.all(
      files.map(async (item: _Object) => {
        const filePath = item.Key;
        const fileName = filePath.split('/').pop();

        await this.copyFile({
          newName: newName + '/' + fileName,
          oldName: filePath,
        });
      }),
    );
  }

  async copyFile({ oldName, newName }: { oldName: string; newName: string }) {
    const bucketName = this.configService.get('AWS_S3_BUCKET');

    const copyCommand = new CopyObjectCommand({
      CopySource: bucketName + '/' + oldName,
      Bucket: bucketName,
      Key: newName,
    });

    await this.client.send(copyCommand);
  }

  deleteFolder(folderName: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: folderName + '/',
    });

    return this.client.send(command);
  }

  uploadFile(file: Buffer, fileName: string, folder: string) {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: folder + '/' + fileName,
      Body: file,
    });

    return this.client.send(command);
  }

  async moveFile({
    oldFolder,
    newFolder,
  }: {
    oldFolder: string;
    newFolder: string;
  }) {
    const bucketName = this.configService.get('AWS_S3_BUCKET');

    const copyCommand = new CopyObjectCommand({
      CopySource: bucketName + '/' + oldFolder,
      Bucket: bucketName,
      Key: newFolder,
    });

    await this.client.send(copyCommand);

    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: oldFolder,
    });

    await this.client.send(deleteCommand);
  }

  deleteFile(fileName: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: fileName,
    });

    return this.client.send(command);
  }

  getFileUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
    });

    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  getSignedUrl(options: GetSignedUrlDto) {
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: options.key,
      ContentType: options.contentType,
      Metadata: {
        'Cache-Control': 'max-age=31536000',
      },
    });

    return getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  async getDataFromStorage(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
    });

    const response = await this.client.send(command);

    const data = await response.Body.transformToString();

    return JSON.parse(data);
  }

  async getFileSize(key: string) {
    const command = new HeadObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
    });

    const response = await this.client.send(command);

    return response.ContentLength;
  }

  async zipFile(zipName: string, listFile: string[]) {
    const bucketName = this.configService.get('AWS_S3_BUCKET');

    const archiveStream = archiver('zip');

    archiveStream.on('error', (error) => {
      console.error('Archival encountered an error:', error);

      throw new Error(error);
    });

    const alreadyZips = [];

    for (const key of listFile) {
      if (!key || alreadyZips.includes(key)) {
        continue;
      }

      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
      const response = await this.client.send(command);

      const baseName = basename(key);

      archiveStream.append(response.Body, {
        name: baseName,
      });

      alreadyZips.push(key);
    }

    const zipStream = new PassThrough();

    archiveStream.pipe(zipStream);

    archiveStream.finalize();

    const uploadS3 = new Upload({
      client: this.client,
      params: {
        Bucket: bucketName,
        Key: zipName,
        ContentType: 'application/zip',
        Body: zipStream,
        Metadata: {
          'Cache-Control': 'max-age=31536000',
        },
      },
    });

    uploadS3.on('httpUploadProgress', (progress) => {
      console.log('Upload situation zip progress', progress);
    });

    await uploadS3.done();
  }

  async writeFile(buffer: Buffer | string, key: string, options = {}) {
    const bucketName = this.configService.get('AWS_S3_BUCKET');

    const uploadS3 = new Upload({
      client: this.client,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ...options,
      },
    });

    uploadS3.on('httpUploadProgress', (progress) => {
      console.log('Upload file ', key, ' progress', progress);
    });

    await uploadS3.done();
  }
}
