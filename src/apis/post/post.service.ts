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

  async findPost(): Promise<Post[]> {
    const result = await this.postModel
      .find()
      .select('title')
      .populate('author', 'username')
      .exec();
    if (result.length === 0) {
      throw new NotFoundException('서버에 등록된 게시물이 없습니다.');
    }
    return result;
  }

  async findOne(id: string): Promise<Post> {
    const result = await this.postModel
      .findById(id)
      .populate('author', 'username')
      .populate({
        // 배열 구조의 populate 형식
        path: 'comments',
        model: 'Comment',
        select: 'content author',
      })
      .exec();
    if (result === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return result;
  }

  async modifyPost(id: string, modifyPost: UpdatePostInput): Promise<Post> {
    const result = await this.postModel.findByIdAndUpdate(id, modifyPost, {
      new: true,
    });
    if (result === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return result;
  }

  async deletePost(id: string): Promise<Post> {
    const result = await this.postModel.findByIdAndUpdate(
      id,
      { isdeleted: true },
      { new: true },
    );
    if (result === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return result;
  }
}
