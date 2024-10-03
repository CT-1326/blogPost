import { CreateCommentInput } from '@dto/createComment.dto';
import { UpdateCommentInput } from '@dto/updateComment.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const newComment = new this.commentModel({
      ...input,
      author: user.id,
    });
    const updatePostComment = await this.postModel
      .findByIdAndUpdate(input.post, {
        $push: {
          comments: {
            content: input.content,
            author: user.id,
          },
        },
      })
      .exec();
    if (updatePostComment === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return await newComment.save();
  }

  async findComments(id: string): Promise<Comment[]> {
    const result = await this.commentModel
      .find({ post: id, isdeleted: false })
      .exec();
    if (result === null) {
      throw new NotFoundException('해당 게시물은 존재하지 않습니다.');
    }
    return result;
  }

  async modifyComment(
    id: string,
    modifyComment: UpdateCommentInput,
  ): Promise<Comment> {
    const result = await this.commentModel
      .findByIdAndUpdate(id, modifyComment)
      .exec();
    if (result === null) {
      throw new NotFoundException('해당 댓글은 존재하지 않습니다.');
    }
    return result;
  }

  async deleteComment(id: string): Promise<Comment> {
    const result = await this.commentModel
      .findByIdAndUpdate(id, { isdeleted: true })
      .exec();
    if (result === null) {
      throw new NotFoundException('해당 댓글은 존재하지 않습니다.');
    }
    return result;
  }
}
