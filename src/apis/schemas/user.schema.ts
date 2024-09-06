import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false }) // 버전 관리의 _v 필드 제거
export class User {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role!: string;

  @Prop({ default: Date.now })
  createAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
