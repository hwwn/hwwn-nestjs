import { DemoFilter } from './../../core/filters/demo.filter';
import { CreatPostDto } from './post.dto';
import {
  Controller,
  Get,
  Req,
  Query,
  Headers,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ForbiddenException,
  UseFilters,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { DemoService } from './providers/demo/demo.service';

@Controller('posts')
// @UseFilters(DemoFilter)
export class PostsController {
  constructor(private readonly demoService: DemoService) {
    this.demoService = demoService;
  }

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
    console.log('id:', typeof id);

    return {
      title: `Post ${id}`,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  store(@Body() post: CreatPostDto) {
    // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限');
    return this.demoService.create(post);
  }
}
