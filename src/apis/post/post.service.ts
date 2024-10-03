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

  async createPost(input: CreatePostInput, user: any): Promise<Post> {
    try {
      const newPost = new this.postModel({
        ...input,
        author: user.id,
      });
      return await newPost.save();
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('서버 에러 발생!');
    }
  }

  async findPosts(): Promise<Post[]> {
    const result = await this.postModel
      .find({ isdeleted: false })
      .populate('author')
      .exec();
    if (result.length === 0) {
      throw new NotFoundException('서버에 등록된 게시물이 없습니다.');
    }
    return result;
  }

  async findPost(id: string): Promise<Post> {
    const result = await this.postModel
      .findById(id)
      .populate('author')
      .populate('comments')
      .exec();
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
    const result = await this.postModel
      .findByIdAndUpdate(id, { isdeleted: true })
      .exec();
    if (result === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return result;
  }
}
