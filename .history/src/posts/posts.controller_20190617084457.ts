import { Controller, Get, Req, Query, Headers } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  index(@Headers() headers) {
    console.log(headers);
    return [
      {
        title: 'hello~',
      },
    ];
  }
}
