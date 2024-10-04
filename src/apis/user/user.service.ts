import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@schemas/user.schema';
import { CreateUserInput } from '@dto/createUser.dto';
import { UpdateUserInput } from '@dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(input: CreateUserInput): Promise<User | undefined> {
    try {
      const result = new this.userModel(input);
      return await result.save();
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ConflictException(`이미 존재하는 계정 입니다.`);
      } else {
        throw new InternalServerErrorException('서버 에러 발생!');
      }
    }
  }

  async findUsers(): Promise<User[]> {
    const result = await this.userModel.find({ isdeleted: false }).exec();
    if (result.length === 0) {
      throw new NotFoundException('서버에 등록된 사용자가 없습니다.');
    }
    return result;
  }

  async findOne(username: string): Promise<User> {
    const result = await this.userModel.findOne({ username }).exec();
    if (result === null) {
      throw new NotFoundException('해당 사용자는 존재하지 않습니다');
    }
    return result;
  }

  async modifyUser(
    username: string,
    modifyUser: UpdateUserInput,
  ): Promise<User> {
    const result = await this.userModel.findOneAndUpdate(
      { username },
      modifyUser,
      { new: true },
    );
    if (result === null) {
      throw new NotFoundException('해당 사용자는 존재하지 않습니다.');
    }
    return result;
  }

  async deleteUser(username: string): Promise<User> {
    const result = await this.userModel.findOneAndUpdate(
      { username },
      { isdeleted: true },
      { new: true },
    );
    if (result === null) {
      throw new NotFoundException('해당 사용자는 존재하지 않습니다.');
    }
    return result;
  }

  async findUser(email: string): Promise<User> {
    const result = await this.userModel.findOne({ email: email }).exec();
    if (result === null) {
      throw new NotFoundException('해당 이메일의 사용자는 존재하지 않습니다');
    }
    return result;
  }
}
