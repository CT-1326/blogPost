import { IsEmail, IsString } from 'class-validator';

export class loginInput {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
