import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false }) // 버전 관리의 _v 필드 제거
export class Comment {
  @Prop({ required: true })
  content!: string;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true, index: true })
  post!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  author!: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updateAt!: Date;

  @Prop({ default: false })
  isdeleted!: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updateAt: new Date() });
  next();
});
