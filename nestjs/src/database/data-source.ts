import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/database/entities/index.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

// ở đây , phần entities là nó sẽ lây tất cả các file entities rồi nhét vào migrations để generate , khi generate xong nó sẽ tạo ra các file ở folder migrations ở trong data_source
// rồi run thì nó mới tạo cho mình cái bảng ở trên db
