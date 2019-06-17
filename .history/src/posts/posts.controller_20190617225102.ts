import { CreatPostDto } from './../../.history/src/posts/post.dto_20190617225013';
import {
  Controller,
  Get,
  Req,
  Query,
  Headers,
  Param,
  Post,
  Body,
} from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Headers('authorization') headers) {
    console.log(headers);

    return [
      {
        title: 'hello~',
      },
    ];
  }

  @Get(':id')
  show(@Param() params) {
    return {
      title: `Post ${params.id}`,
    };
  }

  @Post()
  store(@Body() post: CreatPostDto) {
    console.log(post);
  }
}
