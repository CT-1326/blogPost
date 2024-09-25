import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false }) // 버전 관리의 _v 필드 제거
export class Post {
  @Prop({ required: true, index: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true, index: true })
  author!: Types.ObjectId;

  @Prop({ index: true })
  category!: string;

  @Prop({ type: [String], index: true })
  tags!: string[];

  // @Prop({ type: [{ type: Types.ObjectId, ref: Comment.name }], default: [] })
  // comments!: Types.ObjectId[];

  // @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], default: [] })
  // likes!: Types.ObjectId[];

  @Prop({ default: Date.now })
  createAt!: Date;

  @Prop({ default: Date.now })
  updateAt!: Date;

  @Prop({ default: false })
  isdeleted!: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
