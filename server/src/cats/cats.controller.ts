import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    Param,
    Query,
    UseGuards,
    SetMetadata,
    UseInterceptors
} from '@nestjs/common';
import {CreateCatDto, CreateCatQueryDto} from './create-cat.dto';
import {CatsService} from './cats.service';
import {Cat} from './interfaces/cat.interface';
import {ValidationPipe} from "../validate.pipe";
import {ParseIntPipe} from "../parse-int.pipe";
import {ParseCatPipe} from "./parse-cat.pipe";
import {RolesGuard} from "../roles.guard";
import {AuthGuard} from "../auth.guard";
import {Roles} from "../roles.decorator";
import {LoggingInterceptor} from "../logging.interceptor";
import {TransformInterceptor} from "../transform.interceptor";

@Controller('cats') // 路由基路径
@UseInterceptors(new LoggingInterceptor()) // 拦截器
@UseGuards(RolesGuard) // 基于角色守卫
// @UseFilters(new HttpExceptionFilter()) // 控制器绑定过滤器
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    @UseInterceptors(TransformInterceptor)
    @Roles("admin")
    // @SetMetadata('roles', ['admin']) // 反射器
    // @UsePipes(new ValidationPipe()) // 验证管道
    // @UsePipes(new ParseCatPipe()) // 转换管道
    async create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    @UsePipes(new ParseIntPipe())
    async findOne(@Param('id', new ValidationPipe()) id) {
        return await this.catsService.findOne(id);
    }

}
