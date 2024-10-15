import { IsOptional, IsString } from 'class-validator';

export class UpdatePostInput {
  @IsOptional()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  content!: string;
}
