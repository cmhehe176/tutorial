import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/database/entities/*entity.ts'],
  // entities: ['src/**/*.entity.ts'],// tìm mọi thư mục con của src/ dù có sâu đến mấy vd src/xx/xxx/xxx/xxx/*.entity.ts
  migrations: ['src/database/migrations/*.ts'],
});

// ở đây , phần entities là nó sẽ lây tất cả các file entities rồi nhét vào migrations để generate , khi generate xong nó sẽ tạo ra các file ở folder migrations ở trong data_source
// rồi run thì nó mới tạo cho mình cái bảng ở trên db
