import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity, UserEntity } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';
import { RegisterAdmin } from '../auth/auth.dto';

@Injectable()
export class AdminService {
  private readonly user_db: Repository<UserEntity>
  constructor(
    @InjectRepository(AdminEntity)
    private admin_db: Repository<AdminEntity>,
    private dataSource: DataSource
  ) {
    this.user_db = this.dataSource.getRepository(UserEntity); //2 cách , viết thế nào cũng được , nhưng viết như này thì trông gọn và đẹp hơn 
    //thường thì có thể import Injectable thêm các trường nữa đều được , nhưng mà viết thế thì không khuyến nghị ???
    // hoặc spamm full dataSource cũng được , cho nó tiện 
  }
  // user_db = this.dataSource.getRepository(UserEntity)
  
  getAdminbyEmail = async (email: string) => {
    return await this.admin_db.findOneBy({ email });
  };

  createAdmin = async (data: RegisterAdmin) => {
    return await this.admin_db.insert(data);
  }; 

  deleteUser = async (id: number) => {
    const user = await this.user_db.findOneById(id)

    if (!user)
      throw new HttpException(
        { message: 'Account is not exist ' },
        HttpStatus.BAD_REQUEST,
      );
    
    await this.user_db.softDelete(id)
    return { message : "success" }
  }

  getListUser = async () => {
    const user = await this.user_db.find();
    const listUser = user.map(item => {
      const { password, ...rest } = item; // Tách trường password khỏi các trường còn lại
      return rest; // Trả về phần còn lại của đối tượng mà không có trường password
    });
    return listUser;
  }
}
