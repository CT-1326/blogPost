import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  tags?: string;
}
