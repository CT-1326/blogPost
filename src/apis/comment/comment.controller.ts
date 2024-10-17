import {
  Body,
  Controller,
  Delete,
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
import { RolesGuard } from '@auth/roles/roles.guard';
import { Roles } from '@auth/roles/roles.decorator';

@Controller('comment')
@UseGuards(AuthGuard('access'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Req() req: Request,
    @Body() createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentService.createComment(createCommentInput, req.user);
  }

  @Put(':id')
  async modifyComment(
    @Param('id') id: string,
    @Body() updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    return this.commentService.modifyComment(id, updateCommentInput);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteComment(@Param('id') id: string): Promise<Comment> {
    return this.commentService.deleteComment(id);
  }
}
