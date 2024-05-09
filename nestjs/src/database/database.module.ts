import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// nên chia ra làm một module riêng để clear code hơn là so với nhét thằng typeorm trực tiếp vào app module

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],

			// cách để kết nối động với typeorm
			// ở đây là nơi kết nối đến db , còn cái datasource kia chỉ để phục vụ cho cái việc như là
			//migration: tạo bảng từ entity
			//seed: tạo fake data

			// còn cái config kia chỉ là giống một cái middlerware để có thể làm gì đó ... tùy vào dự án
			// vi dụ: MYSQL_CREDENTIALS là phụ thuộc vào dự án này này 

			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('database.host'),
				port: configService.get('database.port'),
				username: configService.get('database.username'),
				password: configService.get('database.password'),
				database: configService.get('database.database'),
				entities: [],
				synchronize: false,
				autoLoadEntities: true,
				migrations: ['dist/database/migrations/*.js'],
				migrationsRun: configService.get('NODE_ENV') !== 'development',

				//ở đây khi đặt là true thì sẽ tự động thay đổi data mỗi khi có sự thay đổi đầu vào
				//tại sao chỗ khác ngta hay đặt là false nhỉ ???? trong dự án thực tế con Oni ý
			
			}),
		}),
	],
})
export class DatabaseModule { }
