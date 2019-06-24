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
} from '@nestjs/common';
import { DemoService } from './providers/demo/demo.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly demoService: DemoService) {
    this.demoService = demoService;
  }

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param() params) {
    return {
      title: `Post ${params.id}`,
    };
  }

  @Post()
  @UseFilters(DemoFilter)
  store(@Body() post: CreatPostDto) {
    // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
    throw new ForbiddenException('没有权限');
    return this.demoService.create(post);
  }
}
