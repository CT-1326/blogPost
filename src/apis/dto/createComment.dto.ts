import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentInput {
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsMongoId()
  post!: Types.ObjectId;
}
