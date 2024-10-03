import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePostInput {
  @IsString()
  @IsOptional()
  title!: string;

  @IsString()
  @IsOptional()
  content!: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsOptional()
  tags?: string;
}
