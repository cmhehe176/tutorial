import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
	type: 'mysql',
	host: '127.0.0.1',
	port: +process.env.MYSQL_PORT,
	username: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	entities: ['src/entities'],
	migrations: ['database/migrations/*.ts'],
});
