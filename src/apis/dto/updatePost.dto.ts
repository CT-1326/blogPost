import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePostInput {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsOptional()
  tags?: string;
}
