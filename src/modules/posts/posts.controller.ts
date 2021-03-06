import { DemoPipe } from './../../core/pipes/demo.pipe';
import { User } from './../../core/decorators/user.decorator';
import { ErrorsInterceptor } from './../../core/interceptors/errors.interceptor';
import { LoggingInterceptor } from './../../core/interceptors/logging.interceptor';
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
  SetMetadata,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { DemoService } from './providers/demo/demo.service';
import { Roles } from './../../core/decorators/roles.decorator';
import { TransformInterceptor } from './../../core/interceptors/transform.interceptor';

@Controller('posts')
// @UseFilters(DemoFilter)
// @UseInterceptors(LoggingInterceptor)
export class PostsController {
  constructor(private readonly demoService: DemoService) {
    this.demoService = demoService;
  }

  @Get()
  // @UseInterceptors(TransformInterceptor)
  @UseInterceptors(ErrorsInterceptor)
  index() {
    throw new ForbiddenException();
    // return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe, DemoPipe) id) {
    console.log('id:', typeof id);

    return {
      title: `Post ${id}`,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  // @SetMetadata('roles', ['member'])
  @Roles('member')
  store(@Body() post: CreatPostDto, @User('demo') user) {
    console.log(user);
    // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限');
    return this.demoService.create(post);
  }
}
