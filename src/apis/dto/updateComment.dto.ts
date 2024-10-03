import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentInput {
  @IsOptional()
  @IsString()
  content!: string;
}
