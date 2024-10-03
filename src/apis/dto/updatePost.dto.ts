import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePostInput {
  @IsOptional()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  tags?: string;
}
