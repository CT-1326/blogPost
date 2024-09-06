import { IsString } from 'class-validator';

export class UpdateUserInput {
  @IsString()
  password!: string;
}
