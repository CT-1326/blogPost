import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostInput } from '@dto/createPost.dto';
import { Post as PostModel } from '@schemas/post.schema';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePostInput } from '@dto/updatePost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('access'))
  @Post()
  async createPost(
    @Body() createPostInput: CreatePostInput,
  ): Promise<PostModel> {
    return this.postService.createPost(createPostInput);
  }

  @UseGuards(AuthGuard('access'))
  @Get()
  async findPosts(): Promise<PostModel[]> {
    return this.postService.findPosts();
  }

  @UseGuards(AuthGuard('access'))
  @Get(':id')
  async findPost(@Param('id') id: string): Promise<PostModel | null> {
    return this.postService.findPost(id);
  }

  @UseGuards(AuthGuard('access'))
  @Put(':id')
  async modifyPost(
    @Param('id') id: string,
    @Body() updatePost: UpdatePostInput,
  ): Promise<PostModel> {
    return this.postService.modifyPost(id, updatePost);
  }

  @UseGuards(AuthGuard('access'))
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost(id);
  }
}
