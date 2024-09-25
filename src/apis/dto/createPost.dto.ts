import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostInput {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsMongoId()
  author!: Types.ObjectId;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  tags?: string;
}
