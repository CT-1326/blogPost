import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Post } from './post.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  content!: string;

  @Prop({ type: Types.ObjectId, ref: Post.name, required: true, index: true })
  post!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true, index: true })
  author!: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
