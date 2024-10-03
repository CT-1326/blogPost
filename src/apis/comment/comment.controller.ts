import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentInput } from '@dto/createComment.dto';
import { UpdateCommentInput } from '@dto/updateComment.dto';
import { Request } from 'express';
import { Comment } from '@schemas/comment.schema';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('access'))
  @Post()
  async createComment(
    @Req() req: Request,
    @Body() createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentService.createComment(createCommentInput, req.user);
  }
  @UseGuards(AuthGuard('access'))
  @Get(':id')
  async findComments(@Param('id') id: string): Promise<Comment[]> {
    return this.commentService.findComments(id);
  }

  @UseGuards(AuthGuard('access'))
  @Put(':id')
  async modifyComment(
    @Param('id') id: string,
    @Body() updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    return this.commentService.modifyComment(id, updateCommentInput);
  }

  @UseGuards(AuthGuard('access'))
  @Delete(':id')
  async deleteComment(@Param('id') id: string): Promise<Comment> {
    return this.commentService.deleteComment(id);
  }
}
