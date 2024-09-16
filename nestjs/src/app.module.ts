import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './feature/auth/auth.module';
import dbConfig from './config/db.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './feature/auth/guards/auth.guard';
import { RoleGuard } from './feature/auth/guards/role.guard';
import { SendMailModule } from './feature/send-mail/send-mail.module';
import { CloudStorageModule } from './feature/cloud-storage/cloud-storage.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    AuthModule,
    SendMailModule,
    CloudStorageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule {}
