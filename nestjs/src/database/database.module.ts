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
			// 
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('MYSQL_HOST'),
				port: configService.get('MYSQL_PORT'),
				username: configService.get('dMYSQL_USERNAME'),
				password: configService.get('MYSQL_PASSWORD'),
				database: configService.get('MYSQL_DATABASE'),
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
