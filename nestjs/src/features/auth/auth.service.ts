import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Login, RegisterAdmin, RegisterUser } from './auth.dto';
import { DataSource } from 'typeorm';
import { USER_NOT_FOUND } from 'src/common/error';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RoleEntity } from 'src/database/entities';
import { ERole } from 'src/common/constants/auth.constant';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private config: ConfigService,
    private jwtService: JwtService,
    private adminService: AdminService,
    private userService: UserService,
  ) {}

  registerAdmin = async (data: RegisterAdmin) => {
    const admin = await this.adminService.getAdminbyEmail( data.email );

    if (admin)
      throw new HttpException(
        { message: 'Account is exist ' },
        HttpStatus.BAD_REQUEST,
      );

    data.password = this.hash(data.password);
    await this.adminService.createAdmin(data);

    delete data.password;
    return data;
  };

  registerUser = async (data: RegisterUser) => {
    const admin = await this.userService.getUserbyEmail(data.email);

    if (admin)
      throw new HttpException(
        { message: 'Account is exist ' },
        HttpStatus.BAD_REQUEST,
      );

    data.password = this.hash(data.password);
    await this.userService.createUser(data);

    delete data.password;
    return data;
  };

  login = async (roleId: number, data: Login) => {
    //hàm verify kia trả về thông tin user, trong đó sẽ có cả role nữa
    //sau đó role sẽ được ném vào bên trong payload , khi đó khi verify thêm lần nữa cho payload thì nó sẽ lấy role từ payload
    const user = await this.verify(roleId, data.email, data.password);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return this.accessToken(payload);
  };

  hash = (password) => {
    //asynchronous => dùng hashSync hoặc có thể dùng await ở đây cũng được
    const salt = bcrypt.genSaltSync(+this.config.get('SALT'));
    const hashPassword = bcrypt.hashSync(password, salt);
    //or
    //const hashPassword = bcrypt.hash(data.password,10) => fast
    return hashPassword;
  };

  compare = (password, hashpassword) => {
    return bcrypt.compareSync(password, hashpassword);
  };

  accessToken = (payload) => {
    return { Token: this.jwtService.sign(payload) };
  };

  verify = async (roleId, email, password) => {
    const role = await this.dataSource
      .getRepository(RoleEntity)
      .findOneById(roleId);
    let user;

    if (role.name === ERole.ADMIN) {
      user = await this.adminService.getAdminbyEmail(email);
    } else if (role.name === ERole.USER) {
      user = await this.userService.getUserbyEmail(email);
    }

    if (!user)
      throw new HttpException(
        { message: USER_NOT_FOUND },
        HttpStatus.UNAUTHORIZED,
      );

    if (!this.compare(password, user.password))
      throw new HttpException(
        { message: USER_NOT_FOUND },
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  };
}
