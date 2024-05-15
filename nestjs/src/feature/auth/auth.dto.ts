import { IsNotEmpty, IsString } from 'class-validator';

export class Login {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class Register {
  name: string;

  email: string;

  password: string;
}
