import { Controller } from '@nestjs/common';
import { CloudStorageService } from './cloud-storage.service';

@Controller('cloud-storage')
export class CloudStorageController {
  constructor(private readonly cloudStorageService: CloudStorageService) {}
}
