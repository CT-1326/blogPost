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
import { PostService } from './post.service';
import { CreatePostInput } from '@dto/createPost.dto';
import { Post as PostModel } from '@schemas/post.schema';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePostInput } from '@dto/updatePost.dto';
import { Request } from 'express';
import { RolesGuard } from '@auth/roles/roles.guard';
import { Roles } from '@auth/roles/roles.decorator';

@Controller('post')
@UseGuards(AuthGuard('access'))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Req() req: Request,
    @Body() createPostInput: CreatePostInput,
  ): Promise<PostModel> {
    return this.postService.createPost(createPostInput, req.user);
  }

  @Get()
  async findPost(): Promise<PostModel[]> {
    return this.postService.findPost();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostModel> {
    return this.postService.findOne(id);
  }

  @Put(':id')
  async modifyPost(
    @Param('id') id: string,
    @Body() updatePost: UpdatePostInput,
  ): Promise<PostModel> {
    return this.postService.modifyPost(id, updatePost);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost(id);
  }
}
