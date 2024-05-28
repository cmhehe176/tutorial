import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { AdminEntity, RoleEntity } from 'src/database/entities';

export class Login {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterAdmin {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumberString()
  @IsNotEmpty()
  roleId: RoleEntity
}

export class RegisterUser {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumberString()
  @IsNotEmpty()
  roleId: RoleEntity

  @IsNumberString()
  @IsOptional()
  adminId?: AdminEntity
}
