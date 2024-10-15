import { CreateCommentInput } from '@dto/createComment.dto';
import { UpdateCommentInput } from '@dto/updateComment.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '@schemas/comment.schema';
import { Post } from '@schemas/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async createComment(input: CreateCommentInput, user: any): Promise<Comment> {
    const post = await this.postModel.findById(input.post).exec();
    if (!post) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    try {
      const newComment = new this.commentModel({
        ...input,
        author: user.id,
      });
      const result = await newComment.save();
      await this.postModel.findByIdAndUpdate(input.post, {
        $push: {
          comments: result.id,
        },
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('서버 에러 발생!');
    }
  }

  async modifyComment(
    id: string,
    modifyComment: UpdateCommentInput,
  ): Promise<Comment> {
    const result = await this.commentModel.findByIdAndUpdate(
      id,
      modifyComment,
      { new: true },
    );
    if (result === null) {
      throw new NotFoundException('해당 댓글은 존재하지 않습니다.');
    }
    return result;
  }

  async deleteComment(id: string): Promise<Comment> {
    const result = await this.commentModel.findByIdAndUpdate(
      id,
      { isdeleted: true },
      { new: true },
    );
    if (result === null) {
      throw new NotFoundException('해당 댓글은 존재하지 않습니다.');
    }
    return result;
  }
}
