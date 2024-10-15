import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Query, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false, timestamps: true }) // 버전 관리의 _v 필드 제거, 생성&갱신 날짜 옵션 자동 설정
export class Comment {
  @Prop({ required: true })
  content!: string;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  post!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author!: Types.ObjectId;

  @Prop({ default: false })
  isdeleted!: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

// 조회 미들웨어 설정
CommentSchema.pre(/^find/, function (this: Query<any, Comment>, next) {
  this.where({ isdeleted: false });
  next();
});
