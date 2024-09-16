import { ConfigService } from '@nestjs/config';
import * as archiver from 'archiver';
import * as Minio from 'minio';
import { basename } from 'node:path';
import { PassThrough } from 'node:stream';
import { GetSignedUrlDto } from './cloud-storage.dto';
import { CloudStorageInterface } from './cloud-storage.interface';

export class MinioStorage implements CloudStorageInterface {
  public readonly client: Minio.Client;

  constructor(public readonly configService: ConfigService) {
    this.client = new Minio.Client({
      endPoint: configService.get('MINIO_HOST'),
      port: 9000,
      useSSL: false,
      accessKey: configService.get('MINIO_ACCESS_KEY_ID'),
      secretKey: configService.get('MINIO_SECRET_ACCESS_KEY'),
      region: configService.get('MINIO_REGION_NAME'),
    });
  }

  createFolder(folderName: string) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    return this.client.putObject(bucketName, folderName + '/', '');
  }

  async changeFolderName({
    oldName,
    newName,
  }: {
    oldName: string;
    newName: string;
  }) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    const conds = new Minio.CopyConditions();

    await this.client.copyObject(
      bucketName,
      newName + '/',
      bucketName + '/' + oldName + '/',
      conds,
    );

    await this.client.removeObject(bucketName, oldName + '/');
  }

  async getFiles(folderName: string) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    const dataStream = await this.client.listObjectsV2(
      bucketName,
      folderName + '/',
      true,
    );

    return new Promise((resolve, reject) => {
      const data = [];

      dataStream.on('data', (chunk) => {
        if (chunk.name === folderName + '/') {
          return;
        }

        data.push(chunk);
      });

      dataStream.on('end', () => {
        return resolve(data);
      });

      dataStream.on('error', (err) => {
        return reject(err);
      });
    });
  }

  async copyFolder({ newName, oldName }: { newName: string; oldName: string }) {
    const files: any = await this.getFiles(oldName);

    await Promise.all(
      files.map(async (item) => {
        const filePath = item.name;
        const fileName = filePath.split('/').pop();

        await this.copyFile({
          newName: newName + '/' + fileName,
          oldName: filePath,
        });
      }),
    );
  }

  async copyFile({ newName, oldName }: { newName: string; oldName: string }) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    const conds = new Minio.CopyConditions();

    await this.client.copyObject(
      bucketName,
      newName,
      bucketName + '/' + oldName,
      conds,
    );
  }

  deleteFolder(folderName: string) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    return this.client.removeObject(bucketName, folderName + '/', {
      forceDelete: true,
    });
  }

  uploadFile(file: Buffer, fileName: string, folderName: string) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    return this.client.putObject(bucketName, folderName + '/' + fileName, file);
  }

  async moveFile({
    oldFolder,
    newFolder,
  }: {
    oldFolder: string;
    newFolder: string;
  }) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    const conds = new Minio.CopyConditions();

    await this.client.copyObject(
      bucketName,
      newFolder,
      bucketName + '/' + oldFolder,
      conds,
    );

    await this.client.removeObject(bucketName, oldFolder);
  }

  deleteFile(fileName: string) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    return this.client.removeObject(bucketName, fileName);
  }

  getFileUrl(key: string) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    return this.client.presignedGetObject(bucketName, key);
  }

  getSignedUrl(options: GetSignedUrlDto) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    return this.client.presignedPutObject(bucketName, options.key, 3600);
  }

  async getDataFromStorage(key: string) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    const dataStream = await this.client.getObject(bucketName, key);

    return new Promise((resolve, reject) => {
      const data = [];

      dataStream.on('data', function (chunk) {
        data.push(chunk);
      });

      dataStream.on('end', function () {
        return resolve(JSON.parse(Buffer.concat(data).toString()));
      });

      dataStream.on('error', function (err) {
        return reject(err);
      });
    });
  }

  async getFileSize(key: string) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    const response = await this.client.statObject(bucketName, key);

    return response.size;
  }

  async zipFile(zipName: string, listFile: string[]) {
    const bucketName = this.configService.get('MINIO_BUCKET');

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

      const fileStream = await this.client.getObject(bucketName, key);
      const baseName = basename(key);

      archiveStream.append(fileStream, { name: baseName });

      alreadyZips.push(key);
    }

    const zipStream = new PassThrough();

    archiveStream.pipe(zipStream);

    archiveStream.finalize();

    return this.client.putObject(
      bucketName,
      zipName,
      zipStream,
      archiveStream.pointer(),
      {
        ContentType: 'application/zip',
      },
    );
  }

  async writeFile(buffer: Buffer | string, key: string, options = {}) {
    const bucketName = this.configService.get('MINIO_BUCKET');

    return this.client.putObject(
      bucketName,
      key,
      buffer,
      buffer.length,
      options,
    );
  }
}
