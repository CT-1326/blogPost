import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true }) // 버전 관리의 _v 필드 제거, 생성&갱신 날짜 옵션 자동 설정
export class User {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role!: string;

  @Prop({ default: false })
  isdeleted!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
