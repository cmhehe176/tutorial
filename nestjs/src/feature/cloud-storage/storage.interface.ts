import { ConfigService } from '@nestjs/config';
import { GetSignedUrlDto } from './cloud-storage.dto';

export interface CloudStorageInterface {
  readonly client;
  readonly configService: ConfigService;

  createFolder: (folderName: string) => Promise<unknown>;
  changeFolderName: ({
    oldName,
    newName,
  }: {
    oldName: string;
    newName: string;
  }) => Promise<unknown>;
  getFiles: (folderName: string) => Promise<unknown>;
  copyFolder: ({
    oldName,
    newName,
  }: {
    oldName: string;
    newName: string;
  }) => Promise<unknown>;
  copyFile: ({
    oldName,
    newName,
  }: {
    oldName: string;
    newName: string;
  }) => Promise<unknown>;
  deleteFolder: (folderName: string) => Promise<unknown>;
  uploadFile: (
    file: Buffer,
    fileName: string,
    folderName: string,
  ) => Promise<unknown>;
  moveFile: ({
    oldFolder,
    newFolder,
  }: {
    oldFolder: string;
    newFolder: string;
  }) => Promise<unknown>;
  deleteFile: (fileName: string) => Promise<unknown>;
  getFileUrl: (key: string) => Promise<string>;
  getSignedUrl: (options: any) => Promise<string>;
  getDataFromStorage: (key: string) => Promise<unknown>;
  getFileSize: (key: string) => Promise<unknown>;
  zipFile: (zipName: string, listFiles: string[]) => Promise<unknown>;
  writeFile: (
    buffer: Buffer | string,
    key: string,
    options: Record<string, string>,
  ) => Promise<unknown>;
}
