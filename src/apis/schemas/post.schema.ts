import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false, timestamps: true }) // 버전 관리의 _v 필드 제거, 생성&갱신 날짜 옵션 자동 설정
export class Post {
  @Prop({ required: true, index: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  author!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }], default: [] })
  comments!: Types.ObjectId[];

  @Prop({ default: false })
  isdeleted!: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
