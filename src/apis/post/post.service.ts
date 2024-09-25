import { CreatePostInput } from '@dto/createPost.dto';
import { UpdatePostInput } from '@dto/updatePost.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '@schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(input: CreatePostInput): Promise<Post> {
    try {
      const result = new this.postModel(input);
      return result.save();
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('서버 에러 발생!');
    }
  }

  async findPosts(): Promise<Post[]> {
    const result = await this.postModel.find({ isdeleted: false }).exec();
    if (result.length === 0) {
      throw new NotFoundException('서버에 등록된 게시물이 없습니다.');
    }
    return result;
  }

  async findPost(id: string): Promise<Post> {
    const result = await this.postModel.findById(id).exec();
    if (result === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return result;
  }

  async modifyPost(id: string, modifyPost: UpdatePostInput): Promise<Post> {
    const result = await this.postModel
      .findByIdAndUpdate(id, modifyPost)
      .exec();
    if (result === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return result;
  }

  async deletePost(id: string): Promise<Post> {
    const result = await this.postModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return result;
  }
}
